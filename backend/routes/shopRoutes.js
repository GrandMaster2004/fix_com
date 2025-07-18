const express = require("express")
const router = express.Router()
const shopController = require("../controllers/shopController")
const auth = require("../middleware/auth") // Import auth middleware

// Get all shops for the authenticated user
router.get("/", auth, shopController.getShops) // Protected route

// Create a new shop for the authenticated user
router.post("/", auth, shopController.createShop) // Protected route

module.exports = router
