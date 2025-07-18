const Shop = require("../models/Shop")

// @desc    Get all shops for the authenticated user
// @route   GET /api/shops
// @access  Private
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json(shops)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Create a new shop for the authenticated user
// @route   POST /api/shops
// @access  Private
exports.createShop = async (req, res) => {
  const { name, category, location, imageUrl } = req.body
  const newShop = new Shop({
    userId: req.user, // Assign the authenticated user's ID from middleware
    name,
    category,
    location,
    imageUrl,
  })
  try {
    const savedShop = await newShop.save()
    res.status(201).json(savedShop)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
