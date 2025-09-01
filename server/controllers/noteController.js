import pool from "../db.js";

export const getNotes = async (req, res) => {
    const { habitId } = req.params;
    try {
        const result = await pool.query("SELECT * FROM notes WHERE habit_id = $1", [habitId]);
        res.json(result.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get Notes" })
    }
};
export const postNote = async (req, res) => {
    const { habitId } = req.params;
    const { content } = req.body;
    try {
        const result = await pool.query("INSERT INTO notes (habit_id, content) VALUES ($1, $2) RETURNING *", [habitId, content]);
        res.json(result.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create Note" })
    }
};
export const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const result = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [noteId]);
        res.json(result.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to delete Note" })
    }
};