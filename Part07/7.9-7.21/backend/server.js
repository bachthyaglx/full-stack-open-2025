const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./mongo');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
