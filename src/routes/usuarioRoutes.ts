import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { UsuarioModel, Usuario } from '../models/model';

const router = express.Router();

// Rota para criar um novo usuário
router.post('/usuarios', async (req: Request, res: Response) => {
  try {
    const novoUsuario: Usuario = req.body;
    await UsuarioModel.createUsuario(novoUsuario);
    res.status(201).send('Usuário criado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário');
  }
});

// Rota para obter todos os usuários
router.get('/usuarios', async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioModel.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

// Rota para obter um usuário pelo ID
router.get('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const usuarioId = new ObjectId(req.params.id);
    const usuario = await UsuarioModel.getUsuarioById(usuarioId);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar usuário');
  }
});

// Rota para atualizar um usuário pelo ID
router.put('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const usuarioId = new ObjectId(req.params.id);
    const usuarioAtualizado: Usuario = req.body;
    await UsuarioModel.updateUsuario(usuarioId, usuarioAtualizado);
    res.status(200).send('Usuário atualizado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar usuário');
  }
});

// Rota para excluir um usuário pelo ID
router.delete('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const usuarioId = new ObjectId(req.params.id);
    await UsuarioModel.deleteUsuario(usuarioId);
    res.status(200).send('Usuário excluído com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir usuário');
  }
});

export default router;
