const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")
const auth = require("../middleware/auth") // Import auth middleware

// Get all posts (can be public or protected, depending on app design)
// For now, let's keep posts public for a feed, but creation is protected
router.get("/", postController.getPosts) // Public route (for feed)

// Create a new post for the authenticated user
router.post("/", auth, postController.createPost) // Protected route

module.exports = router
