import express from 'express';
import { createClass, joinClass, uploadTugas, getClassUsers, leaveClass } from '../controllers/class.js';
import { uploadSingle } from '../middlewares/fileUpload.js';
const router = express.Router();

router.post('/classes', createClass);
router.post('/classes/join', joinClass);
router.post('/classes/subbmit',uploadSingle, uploadTugas);
router.post('/classes/exit', leaveClass);
router.get('/classes/:classId/users', getClassUsers);

export default router;
