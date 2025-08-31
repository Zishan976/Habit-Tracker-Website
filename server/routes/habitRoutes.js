import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { deleteHabit, getHabit, getHabits, postHabit, putHabit } from '../controllers/habitController.js';

const router = express.Router();

router.use(authenticateUser)

router.get("/", getHabits)

router.get("/:id", getHabit)

router.post("/", postHabit)

router.put("/:id", putHabit)

router.delete("/:id", deleteHabit)

export default router;