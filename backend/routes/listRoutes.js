const express = require("express")
const router = express.Router()
const listController = require("../controllers/listController")
const auth = require("../middleware/auth") // Import auth middleware

// Get all lists for the authenticated user
router.get("/", auth, listController.getLists) // Protected route

// Create a new list for the authenticated user
router.post("/", auth, listController.createList) // Protected route

module.exports = router
