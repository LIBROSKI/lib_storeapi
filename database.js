const mysql = require('mysql2/promise');

const createDatabaseConnection = async () => {
    try {
        if (process.env.DATABASE_TYPE === 'mysql') {
            // Create a connection pool instead of single connection
            const pool = mysql.createPool({
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            
            // Test the connection
            await pool.getConnection();
            console.log('Successfully connected to MySQL database');
            return pool;
        } else {
            throw new Error(`Unsupported database type: ${process.env.DATABASE_TYPE}`);
        }
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error;
    }
};

module.exports = {
    createDatabaseConnection
};