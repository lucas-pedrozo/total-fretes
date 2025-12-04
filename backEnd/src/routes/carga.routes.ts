import { Router } from 'express';
import { createCarga, getAllCargas, getCargaById, updateCarga, deleteCarga } from '../controllers/carga.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.get('/carga', authMiddleware, getAllCargas);
router.get('/carga/:id', authMiddleware, getCargaById);
router.post('/carga', authMiddleware, createCarga);
router.put('/carga/:id', authMiddleware, updateCarga);
router.delete('/carga/:id', authMiddleware, deleteCarga);

export default router;