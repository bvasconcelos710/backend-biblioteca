import express, { Request, Response } from 'express';
import { LivroModel, Livro } from '../models/model';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Rota para criar um novo livro
router.post('/livros', async (req: Request, res: Response) => {
  try {
    const novoLivro: Livro = req.body;
    await LivroModel.createLivro(novoLivro);
    res.status(201).send('Livro criado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar livro');
  }
});

// Rota para obter todos os livros
router.get('/livros', async (req: Request, res: Response) => {
  try {
    const livros = await LivroModel.getLivros();
    res.status(200).json(livros);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar livros');
  }
});

// Rota para obter um livro pelo ID
router.get('/livros/:id', async (req: Request, res: Response) => {
    try {
      const livroId = new ObjectId(req.params.id);
      const livro = await LivroModel.getLivroById(livroId);
      if (livro) {
        res.status(200).json(livro);
      } else {
        res.status(404).send('Livro não encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar livro');
    }
  });
  
  // Rota para atualizar um livro pelo ID
  router.put('/livros/:id', async (req: Request, res: Response) => {
    try {
      const livroId = new ObjectId(req.params.id);
      const livroAtualizado: Livro = req.body;
      await LivroModel.updateLivro(livroId, livroAtualizado);
      res.status(200).send('Livro atualizado com sucesso');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar livro');
    }
  });
  
  // Rota para excluir um livro pelo ID
  router.delete('/livros/:id', async (req: Request, res: Response) => {
    try {
      const livroId = new ObjectId(req.params.id);
      await LivroModel.deleteLivro(livroId);
      res.status(200).send('Livro excluído com sucesso');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao excluir livro');
    }
  });

export default router;
