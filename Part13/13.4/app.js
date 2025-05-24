require('dotenv').config()
const express = require('express')
const { Sequelize, DataTypes, Model } = require('sequelize')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: false // Disable SSL for local proxy use
  }
})

class Blog extends Model {}

Blog.init({
  author: DataTypes.TEXT,
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'blog',
  underscored: true,
  timestamps: false
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ DB Connected')

    await Blog.sync()
    console.log('✅ Blog table synced')

    // Routes
    app.get('/api/blogs', async (req, res) => {
      try {
        const blogs = await Blog.findAll()
        console.log('✅ blogs fetched:', blogs)
        res.json(blogs)
      } catch (err) {
        console.error('❌ GET /api/blogs failed:', err)
        res.status(500).json({ error: 'Failed to fetch blogs' })
      }
    })

    app.post('/api/blogs', async (req, res) => {
      try {
        const blog = await Blog.create(req.body)
        res.status(201).json(blog)
      } catch (error) {
        console.error('❌ Error creating blog:', error.message)
        res.status(400).json({ error: error.message })
      }
    })

    app.delete('/api/blogs/:id', async (req, res) => {
      try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
          await blog.destroy()
          res.status(204).end()
        } else {
          res.status(404).json({ error: 'blog not found' })
        }
      } catch (error) {
        console.error('❌ Error deleting blog:', error.message)
        res.status(500).json({ error: 'Failed to delete blog' })
      }
    })

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Startup Error:', error.message)
    process.exit(1)
  }
}

main()
