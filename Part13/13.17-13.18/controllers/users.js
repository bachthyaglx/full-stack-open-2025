const router = require('express').Router()
const { User, Blog } = require('../models')

// GET all users (with blogs in 13.12)
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

// POST create user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

// PUT update username
router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
      user.username = req.body.username
      await user.save()
      res.json(user)
    } else {
      res.status(404).json({ error: 'user not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
