
import pool from '../db.js'

export const getHabits = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at DESC", [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to fetch habits" })
    }
};
export const getHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM habits WHERE id = $1 AND user_id = $2 ORDER BY created_at DESC", [id, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Habit not found or not authorized" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to fetch habit" })
    }
};
export const postHabit = async (req, res) => {
    const { title, goal } = req.body;
    try {
        const result = await pool.query("INSERT INTO habits (user_id, title, goal) VALUES ($1, $2, $3) RETURNING *", [req.user.id, title, goal]);
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to post habits" })
    }
};
export const putHabit = async (req, res) => {
    const { id } = req.params;
    const { title, goal } = req.body;
    try {
        const result = await pool.query("UPDATE habits SET title = $1, goal = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [title, goal, id, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Habit not found or not authorized" });
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to update habits" })
    }
};
export const deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING *", [id, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Habit not found or not authorized" });
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to delete habits" })
    }
};
