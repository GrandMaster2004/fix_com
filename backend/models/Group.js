const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  iconUrl: { type: String },
  eventDate: { type: Date },
  eventTime: { type: String },
  createdAt: { type: Date, default: Date.now },
  itemsCount: { type: Number, default: 0 },
  takenCount: { type: Number, default: 0 },
  cancelledCount: { type: Number, default: 0 },
  participants: { type: [String], default: [] }, // Array of strings for simplicity
})

module.exports = mongoose.model("Group", groupSchema)
