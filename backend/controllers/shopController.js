const Shop = require("../models/Shop")


exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json(shops)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.createShop = async (req, res) => {
  const { name, category, location, imageUrl } = req.body
  const newShop = new Shop({
    userId: req.user, 
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
