const Post = require("../models/Post")

// @desc    Get all posts (public feed)
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Create a new post for the authenticated user
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  const { username, storeName, imageUrl, caption, hashtags, likesCount, likedBy, timeAgo } = req.body
  const newPost = new Post({
    userId: req.user, // Assign the authenticated user's ID from middleware
    username,
    storeName,
    imageUrl,
    caption,
    hashtags,
    likesCount,
    likedBy,
    timeAgo,
  })
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
