// context/AuthProvider.jsx
import { createContext, useState } from "react";
import axios from "axios";

export const context = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const isLoggedin = !!token;

  /* ==============================
     🔁 REFRESH ACCESS TOKEN (ADMIN ONLY)
     → Runs ONLY if refreshToken exists
  ============================== */
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    // 👉 Staff / Student will not have refreshToken
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
      console.warn(
        "Admin token refresh failed:",
        err.response?.data || err.message
      );
    }

    return null;
  };

  /* ==============================
     🌐 AUTH FETCH (SAFE FOR ALL)
     → Refresh happens ONLY for admin
  ============================== */
  const authFetch = async (url, options = {}) => {
    let access = localStorage.getItem("accessToken");

    const headers = new Headers(options.headers || {});
    if (access) headers.set("Authorization", `Bearer ${access}`);

    let response = await fetch(url, { ...options, headers });

    // 🔁 Retry only if refreshToken exists (ADMIN)
    if (
      response.status === 401 &&
      localStorage.getItem("refreshToken")
    ) {
      const newAccess = await refreshAccessToken();
      if (!newAccess) return response;

      headers.set("Authorization", `Bearer ${newAccess}`);
      response = await fetch(url, { ...options, headers });
    }

    return response;
  };

  /* ==============================
     🔓 ADMIN LOGOUT
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
      console.error(
        "Admin logout failed:",
        err.response?.data || err.message
      );
    } finally {
      logoutLocal();
    }
  };

  /* ==============================
     🔓 LOCAL LOGOUT (STAFF / STUDENT)
  ============================== */
  const logoutLocal = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); // safe to remove even if not exists
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
        logoutAdmin,
        logoutLocal,
      }}
    >
      {children}
    </context.Provider>
  );
};
