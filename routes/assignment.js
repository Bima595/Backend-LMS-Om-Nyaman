import { Router } from 'express';
import {
  createTugas,

} from '../controllers/assignment.js';
import { uploadSingle } from '../middlewares/fileUpload.js';
const router = Router();

// Admin-only routes
router.post('/tugas', uploadSingle, createTugas);  // File upload with 'file' field
// router.put('/tugas/:id', updateTugas); // File upload with 'file' field
// router.delete('/tugas/:id', deleteTugas); // Delete Tugas

// // Public route for getting tugas based on classId
// router.get('/tugas', getTugas);

export default router;
