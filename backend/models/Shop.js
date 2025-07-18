const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  category: { type: String },
  location: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Shop", shopSchema)
