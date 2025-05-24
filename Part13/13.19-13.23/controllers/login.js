const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User } = require('../models')
const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
  const passwordCorrect = password === 'secret' // simple

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign({ username: user.username, id: user.id }, SECRET)

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = router
