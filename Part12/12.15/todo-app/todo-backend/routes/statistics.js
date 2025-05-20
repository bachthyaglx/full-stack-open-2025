const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

/* GET /statistics */
router.get('/', async (req, res) => {
  const added = await getAsync('added_todos') || 0;
  res.json({ added_todos: Number(added) });
});

module.exports = router;
