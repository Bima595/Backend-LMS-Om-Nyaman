import express from 'express';
import {
  getArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from '../controllers/artikel.js';
const router = express.Router();

router.get('/artikel', getArtikel);
router.get('/artikel/:id', getArtikelById);
router.post('/artikel', createArtikel);
router.patch('/artikel/:id', updateArtikel);
router.delete('/artikel/:id', deleteArtikel);

export default router;
