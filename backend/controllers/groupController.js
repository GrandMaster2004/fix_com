const Group = require("../models/Group")

// @desc    Get all groups for the authenticated user
// @route   GET /api/groups
// @access  Private
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json(groups)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Create a new group for the authenticated user
// @route   POST /api/groups
// @access  Private
exports.createGroup = async (req, res) => {
  const { name, iconUrl, eventDate, eventTime, itemsCount, takenCount, cancelledCount, participants } = req.body
  const newGroup = new Group({
    userId: req.user, // Assign the authenticated user's ID from middleware
    name,
    iconUrl,
    eventDate,
    eventTime,
    itemsCount,
    takenCount,
    cancelledCount,
    participants,
  })
  try {
    const savedGroup = await newGroup.save()
    res.status(201).json(savedGroup)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
