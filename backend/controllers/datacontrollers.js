const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../models/post"); // Import Post model
const {uploadToCloudinary} = require("../utils/cloudinary.js");
// exports.addpost = async (req, res) => {
//   try {
//     console.log("🚀 Incoming POST /addpost");
//     console.log("👉 req.body:", req.body);
//     console.log("👉 req.file:", req.file);

//      if (!req.body.heading || !req.body.description || !req.body.userId) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const postData = {
//       heading: req.body.heading,
//       description: req.body.description,
//       username: req.body.username,
//       userId: req.body.userId,
//       role: req.body.role,
//       date: new Date(),
//       likes: [],
//       comments: [],

//       postId: Date.now().toString(),
//       image: req.file ? req.file.filename : '', // Save filename
//     };

//     const post = new Post(postData);
//     await post.save();

//     res.status(201).json({ message: 'Post created' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.addpost = async (req, res) => {
  try {
    console.log("🚀 Incoming POST /addpost");
    console.log("👉 req.body:", req.body);
    console.log("👉 req.file:", req.file);

    const { heading, description, userId, username, role } = req.body;

    if (!heading || !description || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let cloudinaryUrl = "";

    if (req.file?.path) {
      const uploadResult = await uploadToCloudinary(req.file.path);
      if (uploadResult) {
        cloudinaryUrl = uploadResult.secure_url;
      } else {
        return res
          .status(500)
          .json({ error: "Failed to upload image to Cloudinary" });
      }
    }

    const postData = {
      heading,
      description,
      username,
      userId,
      role,
      date: new Date(),
      likes: [],
      comments: [],
      postId: Date.now().toString(),
      image: cloudinaryUrl,
    };

    const post = new Post(postData);
    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("❌ Error in /addpost:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.allposts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("userId", "name role"); // dynamic fetch from User

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /data/like/:postId
// exports.likePost = async (req, res) => {
//   const { postId } = req.params;
//   const userId = req.user.id;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     const index = post.likes.indexOf(userId);
//     if (index === -1) {
//       post.likes.push(userId); // like
//     } else {
//       post.likes.splice(index, 1); // unlike
//     }

//     await post.save();

//     const liked = post.likes.includes(userId);
//     const likeCount = post.likes.length;

//     res.status(200).json({ liked, likeCount });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// GET /data/likestatus/:postId

exports.getLikeStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId; // comes from the token via middleware

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const liked = post.likes.includes(userId);
    res.status(200).json({ liked });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.postbyid = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId }); // assuming 'userId' is a field in your Post model
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password field
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// controllers/datacontrollers.js

exports.searchUsers = async (req, res) => {
  const { query } = req.params;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const users = await User.find({
      name: { $regex: `^${query}`, $options: "i" },
    }).select("name role _id");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
