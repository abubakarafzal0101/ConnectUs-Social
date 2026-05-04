import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();
import { toast } from "react-hot-toast";
import axios from "axios";
const UserContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/get-current-user`,
        { withCredentials: true },
      );
      if (response.data.success) {
        setUserData(response.data.data);
        console.log("data", response.data.data);
      } else {
        setUserData(null); // Agar success false ho toh data clear karein
      }
    } catch (error) {
      console.log("Session expired or no user found");
      setUserData(null); // CRITICAL: Error aane par user state null karein
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success("Profile updated successfully");
        getCurrentUser(); // Update the user data after successful profile update
        navigate("/");
      } else {
        toast.error(response.data.message || "Error updating profile");
      }
    } catch (error) {
      console.log("Error updating profile", error);
      toast.error(error?.response?.data?.message || "Error updating profile");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  const value = { userData, getCurrentUser, updateProfile };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
