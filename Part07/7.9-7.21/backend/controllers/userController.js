const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.registerUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = new User({ username, name, passwordHash });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!passwordCorrect) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const userToken = { username: user.username, id: user._id };
  const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token, username: user.username, name: user.name });
};
