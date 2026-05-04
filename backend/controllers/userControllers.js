import cloudinary from "../config/cloudinary.js";
import UserModel from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, headline, location, about } = req.body;

    let experience = [];
    let education = [];
    let skills = [];

    try {
      experience = JSON.parse(req.body.experience || "[]");
      education = JSON.parse(req.body.education || "[]");
      skills = JSON.parse(req.body.skills || "[]");
    } catch {}

    const profilePicture = req.files?.profilePicture?.[0];
    const coverPicture = req.files?.coverPicture?.[0];

    let profilePictureUrl, coverPictureUrl;

    if (profilePicture) {
      const result = await cloudinary.uploader.upload(profilePicture.path, {
        folder: "linkedin/profilePictures",
      });
      profilePictureUrl = result.secure_url;
    }

    if (coverPicture) {
      const result = await cloudinary.uploader.upload(coverPicture.path, {
        folder: "linkedin/coverPictures",
      });
      coverPictureUrl = result.secure_url;
    }

    const updateData = {
      firstName,
      lastName,
      headline,
      location,
      about,
      experience,
      education,
      skills,
    };

    if (profilePictureUrl) updateData.profilePicture = profilePictureUrl;
    if (coverPictureUrl) updateData.coverPicture = coverPictureUrl;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
