import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userRes.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Login failed' });
    }
}

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Email, password and username are required' });
        }
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET);

        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
}

export const getUser = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to get user' });
    }
}
