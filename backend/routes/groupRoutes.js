const express = require("express")
const router = express.Router()
const groupController = require("../controllers/groupController")
const auth = require("../middleware/auth") 

// Get all groups for the authenticated user
router.get("/", auth, groupController.getGroups) 
// Create a new group for the authenticated user
router.post("/", auth, groupController.createGroup) 

module.exports = router
