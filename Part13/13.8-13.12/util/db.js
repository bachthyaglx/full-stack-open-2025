const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: false
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Connected to the database')
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err.message)
    process.exit(1)
  }
}

module.exports = { connectToDatabase, sequelize }
