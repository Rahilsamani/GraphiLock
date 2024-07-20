import { nanoid } from "nanoid";
import { shuffleArray, unsplash } from "../utils/utilities.js";
import userModel from "../models/user.js";

const search = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields",
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

    return res.json(splitArrays);
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({
      message: "Error fetching images from Unsplash",
      error: error.message,
    });
  }
};

const getByUser = async (req, res) => {
  let { username } = req.query;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Invalid User Name",
    });
  }

  username = username.toLowerCase();

  try {
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res.json(existingUser.sets);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      message: "Error occurred while fetching from DB",
      error: err.message,
    });
  }
};

export { search, getByUser };
