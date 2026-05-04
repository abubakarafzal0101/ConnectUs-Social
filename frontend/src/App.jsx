import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { UserContext } from "./context/UserContextProvider";
import UpdateProfile from "./pages/UpdateProfile";
const App = () => {
  const { userData } = useContext(UserContext);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Login />} replace />
        <Route path="/signup" element={userData ? <Home /> : <Signup />} />
        <Route path="/login" element={userData ? <Home /> : <Login />} />
        <Route
          path="/update-profile"
          element={userData ? <UpdateProfile /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
