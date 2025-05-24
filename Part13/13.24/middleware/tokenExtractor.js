const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')
const User = require('../models/user')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization?.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, SECRET)

    const session = await Session.findOne({ where: { token } })
    if (!session) return res.status(401).json({ error: 'session expired' })

    const user = await User.findByPk(decodedToken.id)
    if (user.disabled) return res.status(403).json({ error: 'user disabled' })

    req.user = user
    req.token = token
    next()
  } catch {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = tokenExtractor

