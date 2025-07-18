require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const listRoutes = require("./routes/listRoutes");
const groupRoutes = require("./routes/groupRoutes");
const shopRoutes = require("./routes/shopRoutes");
const postRoutes = require("./routes/postRoutes");
const savedItemRoutes = require("./routes/savedItemRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/lists", listRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/saved-items", savedItemRoutes);
app.use("/api/auth", authRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Shopping List API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
