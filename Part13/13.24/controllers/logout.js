const router = require('express').Router()
const tokenExtractor = require('../middleware/tokenExtractor')
const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({ where: { token: req.token } })
  res.status(204).end()
})

module.exports = router
