
import pkg from 'pg';


const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect((err) => {
    if (err) {
        console.error("Database connection error:", err.stack)
    } else {
        console.log("Connected to the database")
    }
})


export default pool;
