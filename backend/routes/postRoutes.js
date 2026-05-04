import express from "express";
import {
  addComment,
  createPost,
  getAllPosts,
  hitLike,
} from "../controllers/postControllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
const postRouter = express.Router();

postRouter.post("/create", isAuth, upload.single("image"), createPost);
postRouter.get("/all", isAuth, getAllPosts);
postRouter.get("/like/:postId", isAuth, hitLike);
postRouter.post("/comment/:postId", isAuth, addComment);

export default postRouter;
