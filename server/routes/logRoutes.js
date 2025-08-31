import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { deleteLog, getLogs, postLog, putLog } from '../controllers/logController.js';

const router = express.Router({ mergeParams: true });

router.use(authenticateUser);
router.get("/", getLogs);
router.post("/", postLog);
router.put("/:logId", putLog);
router.delete("/", deleteLog)

export default router;