import express from 'express';
import { getalunos, postaluno, getalunoById, putaluno, deletealuno } from '../controllers/alunoController.js';

const router = express.Router();

router.get('/', getalunos);
router.post('/', postaluno);
router.put('/:id', putaluno);
router.get('/:id', getalunoById);
router.delete('/:id', deletealuno);
export default router;