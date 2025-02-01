require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./database.js');

const app = express();
const PORT = process.env.API_PORT || 5055;
const MAX_PORT_RETRIES = 5;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let db;

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Getting data from database
app.get('/api/getAllProducts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products LIMIT 48');
        res.json(rows);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/api/getPromoAllCodes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM promo_codes LIMIT 48');
        res.json(rows);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/api/getProduct', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [req.query.product_id]);
        res.json(rows);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/api/getPromoCode', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM promo_codes WHERE promo_code = ?', [req.query.promo_code]);
        res.json(rows);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

async function tryStartServer(port, retries = 0) {
    try {
        return await new Promise((resolve, reject) => {
            const server = app.listen(port, () => {
                console.log(`Server running on http://localhost:${port}`);
                resolve(server);
            }).on('error', (err) => {
                if (err.code === 'EADDRINUSE' && retries < MAX_PORT_RETRIES) {
                    console.log(`Port ${port} in use, trying ${port + 1}...`);
                    resolve(tryStartServer(port + 1, retries + 1));
                } else {
                    reject(err);
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

async function startServer() {
    try {
        // Connect to database
        db = await database.createDatabaseConnection();
        
        // Start server with retry logic
        const server = await tryStartServer(PORT);

        // Graceful shutdown
        const shutdown = async () => {
            console.log('Shutting down...');
            if (server) {
                server.close(() => {
                    console.log('Server closed');
                });
            }
            if (db) {
                await db.end();
                console.log('Database connection closed');
            }
            process.exit(0);
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

    } catch (error) {
        console.error('Failed to start server:', error);
        if (db) await db.end();
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };