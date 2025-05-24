require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // optional: disable SQL logs
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
    const blogs = await Blog.findAll()
    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await sequelize.close()
  }
}

main()
