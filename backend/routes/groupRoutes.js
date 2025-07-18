const express = require("express")
const router = express.Router()
const groupController = require("../controllers/groupController")
const auth = require("../middleware/auth") // Import auth middleware

// Get all groups for the authenticated user
router.get("/", auth, groupController.getGroups) // Protected route

// Create a new group for the authenticated user
router.post("/", auth, groupController.createGroup) // Protected route

module.exports = router
