import express from 'express';
import livroController from '../controllers/livroController';
import { verificarToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rota para criar um novo livro
router.post('/livros', verificarToken, livroController.createLivro);
// Rota para obter todos os livros
router.get('/livros', verificarToken, livroController.getAllLivros);
// Rota para obter um livro pelo ID
router.get('/livros/:id', verificarToken, livroController.getLivroById);
// Rota para atualizar um livro pelo ID
router.put('/livros/:id', verificarToken, livroController.updateLivro);
// Rota para excluir um livro pelo ID
router.delete('/livros/:id', verificarToken, livroController.deleteLivro);

export default router;
