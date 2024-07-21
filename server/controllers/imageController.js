import { nanoid } from "nanoid";
import { shuffleArray, unsplash } from "../utils/utilities.js";
import userModel from "../models/user.js";

const search = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "All The Fields Are Required",
    });
  }

  try {
    const pages = 3;
    const images = [];
    const splitArrays = [];

    for (let i = 0; i < pages; i++) {
      const result = await unsplash.search.getPhotos({
        query: keyword,
        perPage: 30,
        orientation: "landscape",
      });

      result.response.results.forEach((each) => {
        images.push({
          id: nanoid(),
          url: each.urls.small,
        });
      });
    }

    shuffleArray(images);

    for (let i = 0; i < images.length; i += 16) {
      splitArrays.push(images.slice(i, i + 16));
    }

    return res.json({
      success: true,
      message: "Images Fetched Successfully",
      splitArrays,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching Images From Unsplash",
      error: error.message,
    });
  }
};

const getUsersImageSet = async (req, res) => {
  try {
    let { username } = req.query;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username Not Found",
      });
    }

    username = username.toLowerCase();

    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res.json({
      success: true,
      message: "Users Image Sets Fetched Successfully",
      sets: existingUser.sets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching Sets",
      error: err.message,
    });
  }
};

export { search, getUsersImageSet };
