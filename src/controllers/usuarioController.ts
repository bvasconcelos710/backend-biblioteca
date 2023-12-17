import { Request, Response } from 'express';
import Usuario, { UsuarioInterface } from '../models/usuarioModel';
import Emprestimo, { EmprestimoInterface } from '../models/emprestimoModel';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || ''

export const register = async (req: Request, res: Response): Promise<void> => {
    const { matricula, nome, email, telefone, senha, categoria } = req.body;
    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            res.status(409).json({ message: 'O usuário já existe' });
            return;
        }

        // Cria um novo usuário
        const novoUsuario = new Usuario({
            matricula,
            nome,
            email,
            telefone,
            senha,
            categoria,
            estado: {
                pendenciaDeDevolucao: false,
                podeFazerEmprestimo: true,
            },
        });
        await novoUsuario.save();
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario || !(await usuario.comparePassword(senha))) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }

        const token = jwt.sign({ subject: usuario._id },
            SECRET_KEY,
            { expiresIn: 3600 });

        res.json({ token, userId: usuario._id });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Retorna todos os usuarios
export const getAllusuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Retorna um Usuario por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario não encontrado' });
            return;
        }
        res.json(usuario);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Cria um novo Usuario
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
    const novoUsuario = req.body;
    try {
        const usuarioCriado = await Usuario.create(novoUsuario);
        res.status(201).json(usuarioCriado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Atualiza um Usuario existente
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
        const usuarioAtualizado: UsuarioInterface | null = await Usuario.findByIdAndUpdate(id, atualizacao, { new: true });
        if (!usuarioAtualizado) {
            res.status(404).json({ message: 'Usuario não encontrado para atualização' });
            return;
        }
        res.json(usuarioAtualizado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Exclui um Usuario
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const usuarioExcluido: UsuarioInterface | null = await Usuario.findByIdAndDelete(id);
        if (!usuarioExcluido) {
            res.status(404).json({ message: 'Usuario não encontrado para exclusão' });
            return;
        }
        res.json({ message: 'Usuario excluído com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verificarPendencia = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const usuario: UsuarioInterface | null = await Usuario.findById(id);
        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        const emprestimos: EmprestimoInterface[] = await Emprestimo.find({ usuario: id });
        const emprestimosAtrasados: EmprestimoInterface[] = emprestimos.filter(
            (emprestimo) => emprestimo.dataEntrega < new Date() // Filtra empréstimos com data de entrega no passado
        );

        if (emprestimosAtrasados.length > 0) {
            usuario.estado.pendenciaDeDevolucao = true; // Usuário possui empréstimos atrasados
            await usuario.save();
            res.json({ pendencias: true });
        } else {
            usuario.estado.pendenciaDeDevolucao = false; // Usuário não possui empréstimos atrasados
            await usuario.save();
            res.json({ pendencias: false });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const resolverPendencia = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const usuario: UsuarioInterface | null = await Usuario.findById(id);
        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        if (usuario.estado.pendenciaDeDevolucao) {
            usuario.estado.pendenciaDeDevolucao = false; // Resolve a pendência
            await usuario.save();
            res.json({ message: 'Pendência resolvida com sucesso' });
        } else {
            res.status(400).json({ message: 'Usuário não possui pendências' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllusuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, verificarPendencia, resolverPendencia, register, login }