import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { deleteNote, getNote, getNotes, postNote, updateNote } from '../controllers/noteController.js';

const router = express.Router();

router.use(authenticateUser)
router.get("/", getNotes);
router.get("/:noteId", getNote)
router.post("/", postNote);
router.put("/:noteId", updateNote)
router.delete("/:noteId", deleteNote);

export default router;