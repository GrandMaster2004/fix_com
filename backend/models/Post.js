const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: { type: String, required: true },
  storeName: { type: String },
  imageUrl: { type: String, required: true },
  caption: { type: String },
  hashtags: { type: String },
  likesCount: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // Array of usernames
  timeAgo: { type: String }, // This can be derived on frontend or updated periodically
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Post", postSchema)
