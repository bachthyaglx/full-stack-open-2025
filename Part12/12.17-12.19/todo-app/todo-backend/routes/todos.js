const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

const singleRouter = express.Router();

/* GET all todos */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST new todo */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  // increment Redis counter
  const current = await getAsync('added_todos') || 0;
  await setAsync('added_todos', Number(current) + 1);

  res.send(todo);
});

/* Middleware to find todo by ID */
const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.sendStatus(404);
    req.todo = todo;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
};

/* GET /todos/:id */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT /todos/:id */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;

  const updated = await req.todo.save();
  res.json(updated);
});

/* DELETE /todos/:id */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* Mount singleRouter at /:id */
router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
