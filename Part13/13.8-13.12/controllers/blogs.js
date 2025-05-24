const router = require('express').Router()
const { Blog } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['id', 'name', 'username']
    },
    attributes: { exclude: ['userId'] }
  })
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).end()

    if (blog.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'only the creator can delete' })
    }

    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// POST /api/blogs (link to user)
router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
