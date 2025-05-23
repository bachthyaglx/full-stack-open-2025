const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User } = require('../models')
const { SECRET } = require('../util/config')
const Session = require('../models/session')

router.post('/', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } })
  const passwordCorrect = req.body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  if (user.disabled) {
    return res.status(401).json({ error: 'account disabled' })
  }

  const userForToken = { username: user.username, id: user.id }
  const token = jwt.sign(userForToken, SECRET)

  await Session.create({
    userId: user.id,
    token,
    createdAt: new Date()
  })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
