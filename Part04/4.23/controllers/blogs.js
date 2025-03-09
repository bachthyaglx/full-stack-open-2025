const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user; // Access user from request object
  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const blog = await new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  }).populate("user", { username: 1, name: 1 });

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user; // Access user from request object set by userExtractor middleware

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }
  
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Unauthorized to delete this blog' });
  }
  
  // Remove blog from Blog
  await Blog.findByIdAndDelete(request.params.id)

  // Remove blog reference from User
  user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id)
    
  await user.save();
  response.sendStatus(204).end();

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter