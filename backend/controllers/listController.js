const List = require("../models/List")

// @desc    Get all lists for the authenticated user
// @route   GET /api/lists
// @access  Private
exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json(lists)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Create a new list for the authenticated user
// @route   POST /api/lists
// @access  Private
exports.createList = async (req, res) => {
  const { name, itemsCount, progress, imageUrl, color } = req.body
  const newList = new List({
    userId: req.user, // Assign the authenticated user's ID from middleware
    name,
    itemsCount,
    progress,
    imageUrl,
    color,
  })
  try {
    const savedList = await newList.save()
    res.status(201).json(savedList)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
