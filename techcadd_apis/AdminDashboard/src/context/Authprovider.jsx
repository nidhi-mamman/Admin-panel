// context/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const context = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const isLoggedin = !!token;

  /* ==============================
     🔁 REFRESH ACCESS TOKEN
  ============================== */
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
      const resp = await axios.post(
        "http://localhost:8000/api/admin/token/refresh/",
        { refresh: refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccess = resp.data?.access;
      if (newAccess) {
        localStorage.setItem("accessToken", newAccess);
        setToken(newAccess);
        return newAccess;
      }
    } catch (err) {
      console.warn("Refresh failed:", err.response?.data || err.message);
    }
    return null;
  };

  /* ==============================
     ✅ VERIFY TOKEN (APP LOAD ONLY)
  ============================== */
  const verifyAccessToken = async (accessToken) => {
    try {
      await axios.post(
        "http://localhost:8000/api/admin/verify-token/",
        { token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      return true;
    } catch {
      return false;
    }
  };

  /* ==============================
     🌐 AUTH FETCH (NO VERIFY HERE)
  ============================== */
  const authFetch = async (url, options = {}) => {
    let access = localStorage.getItem("accessToken");

    const headers = new Headers(options.headers || {});
    if (access) headers.set("Authorization", `Bearer ${access}`);

    let response = await fetch(url, { ...options, headers });

    // 🔁 Access expired → refresh once
    if (response.status === 401) {
      const newAccess = await refreshAccessToken();
      if (!newAccess) return response;

      headers.set("Authorization", `Bearer ${newAccess}`);
      response = await fetch(url, { ...options, headers });
    }

    return response;
  };

  /* ==============================
     🚀 INIT AUTH (ON APP LOAD)
  ============================== */
  useEffect(() => {
    const initAuth = async () => {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      if (!access || !refresh) return;

      const valid = await verifyAccessToken(access);
      if (!valid) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) logoutLocal();
      }
    };

    initAuth();
  }, []);

  /* ==============================
     🔓 LOGOUTS
  ============================== */
  const logoutAdmin = async () => {
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
    } catch (err) {
      console.error("Admin logout failed:", err.response?.data || err.message);
    } finally {
      logoutLocal();
    }
  };

  const logoutLocal = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };

  return (
    <context.Provider
      value={{
        isLoggedin,
        token,
        setToken,
        authFetch,
        refreshAccessToken,
        verifyAccessToken,
        logoutAdmin,
        logoutLocal,
      }}
    >
      {children}
    </context.Provider>
  );
};
