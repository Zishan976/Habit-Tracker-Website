import pool from "../db.js";

export const getLogs = async (req, res) => {
    const { habitId } = req.params;
    const { date } = req.query;
    try {
        let result;
        if (date) {
            result = await pool.query("SELECT * FROM habit_logs WHERE habit_id = $1 AND date = $2", [habitId, date]);
        } else {
            result = await pool.query("SELECT * FROM habit_logs WHERE habit_id = $1", [habitId]);
        }
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to get log" });
    }
};
export const postLog = async (req, res) => {
    const { habitId } = req.params;
    const { date } = req.body;
    try {
        const result = await pool.query("INSERT INTO habit_logs (habit_id, date) VALUES ($1, $2) RETURNING *", [habitId, date]);
        res.json(result.rows)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to post log" })
    }
};
export const putLog = async (req, res) => {
    const { logId } = req.params;
    const { completed } = req.body;
    try {
        const result = await pool.query("UPDATE habit_logs SET completed = $1 WHERE id = $2 RETURNING *", [completed, logId]);
        res.json(result.rows)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to put log" })
    }
};
export const deleteLog = async (req, res) => {
    const { habitId } = req.params;
    try {
        const result = await pool.query("DELETE FROM habit_logs WHERE habit_id = $1 RETURNING *", [habitId]);
        res.json(result.rows)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to delete log" })
    }
};