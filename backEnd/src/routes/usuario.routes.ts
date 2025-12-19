import { Router } from 'express';
import { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario, patchUsuario, } from '../controllers/usuario.controller';
import { allowOwnerOrRoles, authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateMiddleware';
import { usuarioCreateSchema, usuarioUpdateSchema } from '../schema/usuario.schema';

const router = Router();

router.post(
  '/usuario',
  validateBody(usuarioCreateSchema),
  createUsuario
);

router.get(
  '/usuario',
  authMiddleware,
  authorizeRoles('empresa', 'admin'),
  getAllUsuarios
);

router.get(
  '/usuario/:id',
  authMiddleware,
  allowOwnerOrRoles('empresa', 'admin'),
  getUsuarioById
);

router.put(
  '/usuario/:id',
  authMiddleware,
  allowOwnerOrRoles('empresa', 'admin'),
  validateBody(usuarioUpdateSchema),
  updateUsuario
);

router.patch(
  '/usuario/:id',
  authMiddleware,
  allowOwnerOrRoles('empresa', 'admin'),
  validateBody(usuarioUpdateSchema),
  patchUsuario
);

router.delete(
  '/usuario/:id',
  authMiddleware,
  allowOwnerOrRoles('admin'),
  deleteUsuario
);

export default router;