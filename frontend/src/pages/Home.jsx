import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import AllPosts from "../components/AllPosts";
import CreatePostPopup from "../components/CreatePostPopup";
import { PostContext } from "../context/PostContextProvider";
import { Plus } from "lucide-react";

const Home = () => {
  const { setShowCreatePostPopup, showCreatePostPopup } =
    useContext(PostContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white">
      <Navbar />
      <AllPosts />

      {/* ➕ Floating Button */}
      <button
        onClick={() => setShowCreatePostPopup(true)}
        className="fixed bottom-6 right-6 w-16 h-16 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.6)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50"
      >
        <Plus size={28} />
      </button>

      {/* 🪟 Popup */}
      {showCreatePostPopup && <CreatePostPopup />}
    </div>
  );
};

export default Home;
