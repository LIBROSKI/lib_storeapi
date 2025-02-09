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
            
            // Initialize the database
            await initializeDatabase(pool);
            
            return pool;
        } else {
            throw new Error(`Unsupported database type: ${process.env.DATABASE_TYPE}`);
        }
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error;
    }
};

const initializeDatabase = async (pool) => {
    try {
        const createProductsTable = `
            CREATE TABLE IF NOT EXISTS products (
                id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                label VARCHAR(50) NOT NULL DEFAULT 'product' COLLATE 'utf8mb4_general_ci',
                price FLOAT UNSIGNED NOT NULL DEFAULT '0',
                description VARCHAR(50) NOT NULL DEFAULT 'short desc' COLLATE 'utf8mb4_general_ci',
                tags LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
                imgs LONGTEXT NOT NULL COLLATE 'utf8mb4_bin',
                time TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                PRIMARY KEY (id) USING BTREE,
                INDEX (id) USING BTREE,
                CONSTRAINT tags CHECK (json_valid(tags)),
                CONSTRAINT imgs CHECK (json_valid(imgs))
            )
        `;

        const createPromoCodesTable = `
            CREATE TABLE IF NOT EXISTS promo_codes (
                id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                discount INT(11) UNSIGNED NOT NULL DEFAULT '10',
                code VARCHAR(50) NOT NULL DEFAULT 'free10' COLLATE 'utf8mb4_general_ci',
                time TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                PRIMARY KEY (id) USING BTREE,
                INDEX (id) USING BTREE
            )
        `;

        await pool.query(createProductsTable);
        await pool.query(createPromoCodesTable);
        console.log('Database tables initialized');
    } catch (error) {
        console.error('Database initialization error:', error.message);
        throw error;
    }
};

module.exports = {
    createDatabaseConnection
};
