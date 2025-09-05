const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const { postbyid } = require('../controllers/datacontrollers');
const dataroutes = require("./routes/dataroutes");
const authRoutes = require("./routes/authRoutes");
const byidRoutes = require("./routes/byidroutes"); // Import byidRoutes



// const allowedOrigins = process.env.ORIGIN_URL?.split(',');
const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173",
  "https://linksphere-link.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true  // allow withCredentials requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/by", byidRoutes); // Use byidRoutes for user-specific routes
// Routes
app.use("/auth", authRoutes);
// dataroutes
app.use("/data", dataroutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    startServer();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Separate app.listen
function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
