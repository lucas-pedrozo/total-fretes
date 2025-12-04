import { Router } from 'express';
import { createImagemUsuario, getAllImagensUsuario, getImagemUsuarioById, updateImagemUsuario, deleteImagemUsuario } from '../controllers/imagem_usuario.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadSingleImage, handleMulterError } from '../middleware/uploadMiddleware';

const router = Router();
router.post('/imgUsuario', authMiddleware, uploadSingleImage('imgUrl'), handleMulterError, createImagemUsuario);
router.get('/imgUsuario', authMiddleware, getAllImagensUsuario);
router.get('/imgUsuario/:id', authMiddleware, getImagemUsuarioById);
router.put('/imgUsuario/:id', authMiddleware, uploadSingleImage('imgUrl'), handleMulterError, updateImagemUsuario);
router.delete('/imgUsuario/:id', authMiddleware, deleteImagemUsuario);

export default router;