import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { deleteNote, getNotes, postNote } from '../controllers/noteController.js';

const router = express.Router({ mergeParams: true });

router.use(authenticateUser)
router.get("/", getNotes);
router.post("/", postNote);
router.delete("/:noteId", deleteNote);

export default router;