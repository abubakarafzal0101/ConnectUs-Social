import cloudinary from "../config/cloudinary.js";
import PostModel from "../models/postModel.js";
import fs from "fs";
// create a post
export const createPost = async (req, res) => {
  try {
    let { description } = req.body;
    const author = req.userId;
    let image;
    if (req.file) {
      let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      image = result.secure_url;

      fs.unlinkSync(req.file.path);
      let newPost = await PostModel.create({
        author,
        description,
        image,
      });

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: newPost,
      });
    } else {
      let newPost = await PostModel.create({ author, description });

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: newPost,
      });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", "firstName lastName profilePicture headline")
      .populate("comments.user", "firstName lastName profilePicture headline")
      .sort({ createdAt: -1 });

    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "No posts found" });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const hitLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    let post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    // 🔥 IMPORTANT: populate before sending
    post = await PostModel.findById(postId)
      .populate("author", "firstName lastName profilePicture headline")
      .populate("comments.user", "firstName lastName profilePicture headline");

    return res.json({
      success: true,
      message: "Updated",
      post,
    });
  } catch (err) {
    console.log(err);
  }
};
export const addComment = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;
    const { content } = req.body;

    let post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user: userId,
            content,
          },
        },
      },
      { new: true },
    )
      .populate("author", "firstName lastName profilePicture headline")
      .populate("comments.user", "firstName lastName profilePicture headline");

    return res.json({
      success: true,
      message: "Comment added",
      post,
    });
  } catch (error) {
    console.error(error);
  }
};
