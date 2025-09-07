import pool from "../db.js";

export const getNotes = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY timestamp DESC", [req.user.id]);
        res.json(result.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get Notes" })
    }
};
export const getNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND id = $2 ORDER BY timestamp DESC", [req.user.id, noteId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Note not found or not authorized" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get Note" })
    }
}
export const postNote = async (req, res) => {
    const { content } = req.body;
    try {
        const result = await pool.query("INSERT INTO notes (user_id, content) VALUES ($1, $2) RETURNING *", [req.user.id, content]);
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create Note" })
    }
};
export const updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { content } = req.body;
    try {
        const result = await pool.query("UPDATE notes SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [content, noteId, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Note not found or not authorized" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update Note" })
    }
}
export const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const result = await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", [noteId, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Note not found or not authorized" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to delete Note" })
    }
};
