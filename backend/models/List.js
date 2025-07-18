const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  itemsCount: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  imageUrl: { type: String },
  color: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("List", listSchema)
