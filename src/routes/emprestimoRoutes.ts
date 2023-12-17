import express from 'express';
import emprestimoController from '../controllers/emprestimoController'
import { verificarToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rota para criar um novo empréstimo
router.post('/emprestimos', verificarToken, emprestimoController.createEmprestimo);
// Rota para obter todos os empréstimos
router.get('/emprestimos', verificarToken, emprestimoController.getAllemprestimos);
// Rota para obter um empréstimo pelo ID
router.get('/emprestimos/:id', verificarToken, emprestimoController.getEmprestimoById);
// Rota para atualizar um empréstimo pelo ID
router.put('/emprestimos/:id', verificarToken, emprestimoController.updateEmprestimo);
// Rota para excluir um empréstimo pelo ID
router.delete('/emprestimos/:id', verificarToken, emprestimoController.deleteEmprestimo);

export default router;
