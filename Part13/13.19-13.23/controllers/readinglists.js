const { tokenExtractor } = require('../util/middleware')

router.put('/:id', tokenExtractor, async (req, res) => {
  const entry = await ReadingList.findByPk(req.params.id)
  if (!entry) return res.status(404).end()

  if (entry.userId !== req.decodedToken.id)
    return res.status(403).json({ error: 'unauthorized' })

  entry.read = req.body.read
  await entry.save()
  res.json(entry)
})
