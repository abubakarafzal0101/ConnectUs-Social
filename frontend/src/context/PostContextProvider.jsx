import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const PostContext = createContext();
import { toast } from "react-hot-toast";
const PostContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/post/all`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setPosts(response.data.posts);
        console.log(response.data.posts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (formData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/post/create`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAllPosts();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create post");
    }
  };

  const toggleLike = async (postId) => {
    try {
      const response = await axios.get(`${serverUrl}/api/post/like/${postId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log(response.data.post);
        getAllPosts();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to toggle like");
    }
  };

  const addComment = async (postId, content) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/post/comment/${postId}`,
        { content },
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        console.log(response.data.post);
        toast.success(response.data.message);
        getAllPosts();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add comment");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const value = {
    getAllPosts,
    posts,
    setPosts,
    createPost,
    showCreatePostPopup,
    setShowCreatePostPopup,
    toggleLike,
    addComment,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
