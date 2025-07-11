const mysql = require('mysql2')
require('dotenv').config()

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'store_rating_platform',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  
  multipleStatements: true,
  timezone: '+00:00'
}


const pool = mysql.createPool(dbConfig)


const promisePool = pool.promise()


const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection()
    console.log('✅ Database connected successfully!')
    console.log(`Connected to MySQL database: ${dbConfig.database}`)
    connection.release()
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    return false
  }
}

module.exports = {
  pool,
  promisePool,
  testConnection,
  dbConfig
}
