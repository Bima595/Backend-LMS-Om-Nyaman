import express from 'express';
import { createClass, joinClass, getClassUsers, leaveClass } from '../controllers/class.js';

const router = express.Router();

router.post('/classes', createClass);
router.post('/classes/join', joinClass);
router.post('/classes/exit', leaveClass);
router.get('/classes/:classId/users', getClassUsers);

export default router;
