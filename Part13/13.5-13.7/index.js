require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Connected to Postgres')
  } catch (error) {
    console.error('❌ Connection failed:', error)
  } finally {
    await sequelize.close()
  }
}

main()
