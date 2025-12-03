// context/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const context = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const isLoggedin = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);
  
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
    <context.Provider value={{ isLoggedin, token, setToken, logout }}>
      {props.children}
    </context.Provider>
  );
};
