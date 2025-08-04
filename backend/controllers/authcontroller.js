const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = require('../models/post'); // Import Post model

// 👉 Sign Up
exports.register = async (req, res) => {
  try {
    const {
      name, email, password, phone, role,
      college, skills, age, gender,
      working, description
    } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    // console.log("Registering user:", name, email);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      college,
      skills,
      age,
      gender,
      working,
      description,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    console.log("User registered successfully:", user._id);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👉 Sign In
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



 
// 👉 Update Profile
exports.updateprofile = async (req, res) => {
  try {
    const userId = req.user.userId; // injected by auth middleware

    const allowedFields = [
      "name",
      "phone",
      "role",
      "college",
      "skills",
      "age",
      "gender",
      "description",
      "working"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      updatedUser: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        college: updatedUser.college,
        skills: updatedUser.skills,
        age: updatedUser.age,
        gender: updatedUser.gender,
        description: updatedUser.description,
        working: updatedUser.working,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

