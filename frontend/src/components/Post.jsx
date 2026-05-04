import React, { useContext, useState } from "react";
import { Heart, MessageCircle, Share2, Send, X } from "lucide-react";
import { PostContext } from "../context/PostContextProvider";
import { UserContext } from "../context/UserContextProvider";

const Post = ({ post }) => {
  const { toggleLike, addComment } = useContext(PostContext);
  const { userData } = useContext(UserContext);

  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const isLongText = post.description?.length > 180;

  const isLiked = userData?._id && post.likes.includes(userData._id);

  const handleLike = () => {
    toggleLike(post._id);
  };

  // 💬 ADD COMMENT
  const handleAddComment = () => {
    if (!comment.trim()) return;
    addComment(post._id, comment);
    setComment("");
  };

  // ⌨️ ENTER KEY SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className="bg-zinc-900/70 border border-white/10 rounded-3xl overflow-hidden">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-3 p-4 cursor-pointer">
        <img
          src={post.author.profilePicture}
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
        />
        <div>
          <h3 className="text-sm font-semibold text-white cursor-pointer">
            {post.author.firstName} {post.author.lastName}
          </h3>
          <p className="text-xs text-zinc-400">{post.author.headline}</p>
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <div className="px-4 text-sm text-zinc-300">
        {expanded || !isLongText
          ? post.description
          : post.description.slice(0, 180) + "..."}

        {isLongText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-blue-500 text-xs cursor-pointer"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* --- IMAGE --- */}
      {post.image && (
        <img
          src={post.image}
          className="w-full max-h-[500px] object-cover mt-3"
        />
      )}

      {/* --- ACTIONS --- */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-white/10">
        {/* LIKE */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 cursor-pointer ${
            isLiked ? "text-red-500" : "text-zinc-400 hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={isLiked ? "red" : "none"} />
          <span className="text-xs">{post.likes.length}</span>
        </button>

        {/* COMMENT */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 cursor-pointer"
        >
          <MessageCircle size={18} />
          <span className="text-xs">{post.comments.length}</span>
        </button>

        {/* SHARE */}
        <button className="flex items-center gap-2 text-zinc-400 hover:text-green-400 cursor-pointer">
          <Share2 size={18} />
          <span className="text-xs">Share</span>
        </button>
      </div>

      {/* ===================================================== */}
      {/* 💬 COMMENT SECTION (BELOW POST - RESPONSIVE) */}
      {/* ===================================================== */}

      {showComments && (
        <div className="border-t border-white/10 p-4 space-y-4">
          {/* INPUT */}
          <div className="flex items-center gap-2 bg-zinc-800 rounded-xl px-3 py-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a comment..."
              className="flex-1 bg-transparent outline-none text-sm text-white cursor-text"
            />

            <button
              onClick={handleAddComment}
              className="text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              <Send size={18} />
            </button>
          </div>

          {/* COMMENTS LIST */}
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {post.comments.map((c) => (
              <div key={c._id} className="flex gap-3">
                <img
                  src={c.user.profilePicture}
                  className="w-9 h-9 rounded-full object-cover cursor-pointer"
                />

                <div className="bg-zinc-900 border border-white/10 px-3 py-2 rounded-xl w-full">
                  <p className="text-xs font-semibold text-white cursor-pointer">
                    {c.user.firstName} {c.user.lastName}
                  </p>

                  <p className="text-[11px] text-zinc-400">{c.user.headline}</p>

                  <p className="text-sm text-zinc-200 mt-1">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
