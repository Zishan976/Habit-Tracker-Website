import pkg from 'pg';

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL environment variable is not set.");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Handle errors on the pool to prevent app crash
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    // process.exit(-1); // optionally exit or handle gracefully
});

// Connect once to verify connection
async function connectPool() {
    try {
        const client = await pool.connect();
        console.log("Connected to the database");
        client.release();
    } catch (err) {
        console.error("Database connection error:", err.stack);
    }
}

connectPool();

export default pool;
