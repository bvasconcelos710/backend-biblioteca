import { Request, Response } from 'express';
import Emprestimo, { EmprestimoInterface } from '../models/emprestimoModel';

// Retorna todos os emprestimos
export const getAllemprestimos = async (req: Request, res: Response): Promise<void> => {
    try {
        const emprestimos = await Emprestimo.find();
        res.json(emprestimos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Retorna um Emprestimo por ID
export const getEmprestimoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const emprestimo = await Emprestimo.findById(id);
        if (!emprestimo) {
            res.status(404).json({ message: 'Emprestimo não encontrado' });
            return;
        }
        res.json(emprestimo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Cria um novo Emprestimo
export const createEmprestimo = async (req: Request, res: Response): Promise<void> => {
    const novoEmprestimo = req.body;
    try {
        const emprestimoCriado = await Emprestimo.create(novoEmprestimo);
        res.status(201).json(emprestimoCriado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Atualiza um Emprestimo existente
export const updateEmprestimo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
        const emprestimoAtualizado: null = await Emprestimo.findByIdAndUpdate(id, atualizacao, { new: true });
        if (!emprestimoAtualizado) {
            res.status(404).json({ message: 'Emprestimo não encontrado para atualização' });
            return;
        }
        res.json(emprestimoAtualizado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Exclui um Emprestimo
export const deleteEmprestimo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const emprestimoExcluido: null = await Emprestimo.findByIdAndDelete(id);
        if (!emprestimoExcluido) {
            res.status(404).json({ message: 'Emprestimo não encontrado para exclusão' });
            return;
        }
        res.json({ message: 'Emprestimo excluído com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllemprestimos, getEmprestimoById, createEmprestimo, updateEmprestimo, deleteEmprestimo }