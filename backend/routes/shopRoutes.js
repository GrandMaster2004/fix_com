const express = require("express")
const router = express.Router()
const shopController = require("../controllers/shopController")
const auth = require("../middleware/auth") 

// Get all shops for the authenticated user
router.get("/", auth, shopController.getShops)

// Create a new shop for the authenticated user
router.post("/", auth, shopController.createShop) 

module.exports = router
