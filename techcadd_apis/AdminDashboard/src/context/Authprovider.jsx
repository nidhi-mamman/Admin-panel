// context/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const context = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const isLoggedin = !!token;

  // helper: refresh access token using stored refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.warn("No refresh token available");
      return null;
    }
    try {
      console.log("Attempting to refresh access token...");
      const resp = await axios.post(
        "http://localhost:8000/api/admin/token/refresh/",
        { refresh: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Refresh response:", resp.data);
      const newAccess = resp.data?.access || resp.data?.accessToken || resp.data?.token;
      if (newAccess) {
        console.log("New access token received, storing...");
        setToken(newAccess);
        localStorage.setItem("accessToken", newAccess);
        return newAccess;
      }
    } catch (err) {
      console.warn("Refresh token failed:", err.response?.data || err.message);
      // do not auto-clear tokens here; let caller decide what to do on failure
    }
    return null;
  };

  // helper: verify access token validity (returns true/false)
  const verifyAccessToken = async (accessToken) => {
    const tokenToVerify = accessToken || localStorage.getItem("accessToken");
    if (!tokenToVerify) {
      console.warn("No token to verify");
      return false;
    }
    try {
      // Send token in Authorization header (most common way to verify)
      await axios.post(
        "http://localhost:8000/api/admin/verify-token/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenToVerify}`,
          },
        }
      );
      console.log("Token verification passed");
      return true;
    } catch (err) {
      console.warn("Token verification failed:", err.response?.status, err.response?.data);
      return false;
    }
  };

  // convenience fetch wrapper that adds Authorization header and auto-refreshes once on 401
  const authFetch = async (input, init = {}) => {
    let access = localStorage.getItem("accessToken");

    // if we have an access token, verify it first; if invalid, try refresh
    if (access) {
      const valid = await verifyAccessToken(access);
      if (!valid) {
        access = await refreshAccessToken();
      }
    } else {
      // no access token in storage, try refresh (in case page reload dropped in-memory state)
      access = await refreshAccessToken();
    }

    const headers = new Headers(init.headers || {});
    if (access) headers.set("Authorization", `Bearer ${access}`);

    const response = await fetch(input, { ...init, headers });
    if (response.status !== 401) return response;

    // try refresh once more on 401
    const newAccess = await refreshAccessToken();
    if (!newAccess) return response; // still 401

    // retry original request with new token
    const retryHeaders = new Headers(init.headers || {});
    retryHeaders.set("Authorization", `Bearer ${newAccess}`);
    return fetch(input, { ...init, headers: retryHeaders });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  // on app load: validate existing access token, or refresh if needed
  useEffect(() => {
    const initAuth = async () => {
      const refresh = localStorage.getItem("refreshToken");

      // If a refresh token exists, try refreshing to get a fresh access token on page load
      if (refresh) {
        await refreshAccessToken();
        // don't clear tokens on failure - let API calls decide if unauthorized
      }
    };
    initAuth();
  }, []);
  
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/admin/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setToken(null);
    }
  };

  return (
    <context.Provider value={{ isLoggedin, token, setToken, logout, refreshAccessToken, verifyAccessToken, authFetch }}>
      {props.children}
    </context.Provider>
  );
};
