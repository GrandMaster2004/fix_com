const express = require("express")
const router = express.Router()
const listController = require("../controllers/listController")
const auth = require("../middleware/auth") 

// Get all lists for the authenticated user
router.get("/", auth, listController.getLists) 

// Create a new list for the authenticated user
router.post("/", auth, listController.createList) 
module.exports = router
