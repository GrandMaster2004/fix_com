const Post = require("../models/Post")


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


exports.createPost = async (req, res) => {
  const { username, storeName, imageUrl, caption, hashtags, likesCount, likedBy, timeAgo } = req.body
  const newPost = new Post({
    userId: req.user, 
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
