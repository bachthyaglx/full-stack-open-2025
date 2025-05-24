const router = require('express').Router()
const { Blog } = require('../models')
const { Op } = require('sequelize')
const tokenExtractor = require('../middleware/tokenExtractor')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

// GET all blogs
router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    const term = `%${req.query.search}%`
    where[Op.or] = [
      { title: { [Op.iLike]: term } },
      { author: { [Op.iLike]: term } }
    ]
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name', 'username']
    },
    where,
    order: [['likes', 'DESC']]
  })

  res.json(blogs)
})

// POST create blog
router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

// PUT update blog
router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

// DELETE blog
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

module.exports = router
