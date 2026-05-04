import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContextProvider";
import { UserContext } from "../context/UserContextProvider"; // ✅ ADD THIS
import { X, Image as ImageIcon } from "lucide-react";

const CreatePostPopup = () => {
  const { setShowCreatePostPopup, createPost } = useContext(PostContext);

  const { userData } = useContext(UserContext); // ✅ GET USER

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() && !image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("description", description);
    if (image) formData.append("image", image);

    await createPost(formData);
    setLoading(false);
    setShowCreatePostPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100]">
      <div className="w-full max-w-xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Create a post</h2>

          <button
            onClick={() => setShowCreatePostPopup(false)}
            className="p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X size={18} className="text-zinc-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* ✅ REAL USER INFO */}
          <div className="flex items-center gap-3">
            <img
              src={
                userData?.profilePicture ||
                "https://ui-avatars.com/api/?background=111&color=fff"
              }
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-sm font-semibold text-white">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="text-xs text-zinc-500">
                {userData?.headline || "Post to anyone"}
              </p>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none resize-none min-h-[120px]"
          />

          {/* Image Upload */}
          <label className="border border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition">
            <ImageIcon className="text-zinc-500" />
            <span className="text-xs text-zinc-500">Add image</span>

            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="relative">
              <img
                src={preview}
                className="w-full max-h-72 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full cursor-pointer hover:bg-black"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end pt-2 border-t border-white/10">
            <button
              type="submit"
              disabled={loading || (!description.trim() && !image)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer
              ${
                loading || (!description.trim() && !image)
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPopup;
