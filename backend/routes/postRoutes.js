const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/", postController.getPosts);

// Create a new post for the authenticated user
router.post("/", auth, postController.createPost);

module.exports = router;
