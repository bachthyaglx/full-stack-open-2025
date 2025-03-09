const Blog = require('../models/blogModel');
const User = require('../models/userModel');

// Fetch all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  const { title, author, url, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const blog = new Blog({ title, author, url, user: userId });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog' });
  }
};

// Add comment to a Blog Post
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.comments = blog.comments || []; // Ensure comments array exists
    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(blog); // Return updated blog with new comments
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
