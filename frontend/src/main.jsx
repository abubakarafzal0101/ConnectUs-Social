import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import PostContextProvider from "./context/PostContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PostContextProvider>
      <UserContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UserContextProvider>
    </PostContextProvider>
  </BrowserRouter>,
);
