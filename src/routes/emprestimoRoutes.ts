import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { EmprestimoModel, Emprestimo, UsuarioModel } from '../models/model';

const router = express.Router();

// Rota para criar um novo empréstimo
router.post('/emprestimos', async (req: Request, res: Response) => {
  try {
    const novoEmprestimo: Emprestimo = req.body;
    // Adiciona a duração máxima em dias (por exemplo, 14 dias)
    novoEmprestimo.duracaoMaxima = 14; 
    // Calcula a data de entrega com base na data de empréstimo e na duração máxima
    novoEmprestimo.dataEntrega = new Date(novoEmprestimo.dataEmprestimo);
    novoEmprestimo.dataEntrega.setDate(novoEmprestimo.dataEntrega.getDate() + novoEmprestimo.duracaoMaxima);
    
    await EmprestimoModel.createEmprestimo(novoEmprestimo);

    // Após criar o empréstimo, atualiza o estado do usuário com base nas pendências
    const usuario = await UsuarioModel.getUsuarioComPendencias(novoEmprestimo.usuario._id);
    if (usuario) {
      // Atualiza o estado do usuário no banco de dados
      await UsuarioModel.updateUsuario(usuario._id, usuario);
    }

    res.status(201).send('Empréstimo criado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar empréstimo');
  }
});

// Rota para obter todos os empréstimos
router.get('/emprestimos', async (req: Request, res: Response) => {
  try {
    const emprestimos = await EmprestimoModel.getEmprestimos();
    res.status(200).json(emprestimos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar empréstimos');
  }
});

// Rota para obter um empréstimo pelo ID
router.get('/emprestimos/:id', async (req: Request, res: Response) => {
  try {
    const emprestimoId = new ObjectId(req.params.id);
    const emprestimo = await EmprestimoModel.getEmprestimoById(emprestimoId);
    if (emprestimo) {
      res.status(200).json(emprestimo);
    } else {
      res.status(404).send('Empréstimo não encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar empréstimo');
  }
});

// Rota para atualizar um empréstimo pelo ID
router.put('/emprestimos/:id', async (req: Request, res: Response) => {
  try {
    const emprestimoId = new ObjectId(req.params.id);
    const emprestimoAtualizado: Emprestimo = req.body;
    await EmprestimoModel.updateEmprestimo(emprestimoId, emprestimoAtualizado);
    res.status(200).send('Empréstimo atualizado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar empréstimo');
  }
});

// Rota para excluir um empréstimo pelo ID
router.delete('/emprestimos/:id', async (req: Request, res: Response) => {
  try {
    const emprestimoId = new ObjectId(req.params.id);
    await EmprestimoModel.deleteEmprestimo(emprestimoId);
    res.status(200).send('Empréstimo excluído com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir empréstimo');
  }
});

export default router;
