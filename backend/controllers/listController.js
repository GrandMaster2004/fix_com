const List = require("../models/List")


exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json(lists)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


exports.createList = async (req, res) => {
  const { name, itemsCount, progress, imageUrl, color } = req.body
  const newList = new List({
    userId: req.user, 
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
