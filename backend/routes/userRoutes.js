import express from "express";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.get("/get-current-user", isAuth, getCurrentUser);
userRouter.put(
  "/update-profile",
  isAuth,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),

  updateProfile,
);

export default userRouter;
