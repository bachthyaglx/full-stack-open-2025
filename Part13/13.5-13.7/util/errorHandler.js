const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Validation error' })
  }

  next(err)
}

module.exports = errorHandler
