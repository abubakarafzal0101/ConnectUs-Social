import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
import { toast } from "react-hot-toast";
import { UserContext } from "./UserContextProvider";
const AuthContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { getCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getCurrentUser();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getCurrentUser();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getCurrentUser();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const value = {
    handleSignup,
    handleLogin,
    handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
