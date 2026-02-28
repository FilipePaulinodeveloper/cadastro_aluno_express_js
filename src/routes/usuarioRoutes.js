import express from 'express';
import { getUsuarios, postUsuario, getUsuarioById, putUsuario, deleteUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.get('/:id', getUsuarioById);
router.delete('/:id', deleteUsuario);
export default router;