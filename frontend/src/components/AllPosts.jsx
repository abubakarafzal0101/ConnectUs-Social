import React, { useContext } from "react";
import { PostContext } from "../context/PostContextProvider";
import Post from "./Post";

const AllPosts = () => {
  const { posts } = useContext(PostContext);

  return (
    <div className="pt-24 max-w-2xl mx-auto px-4 space-y-6">
      {posts.length === 0 ? (
        <p className="text-zinc-500 text-center">No posts yet</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default AllPosts;
