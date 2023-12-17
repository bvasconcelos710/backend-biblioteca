import { Request, Response } from 'express';
import Livro from '../models/livroModel';
import { LivroInterface } from '../models/livroModel';

// Retorna todos os livros
export const getAllLivros = async (req: Request, res: Response): Promise<void> => {
    try {
        const livros = await Livro.find();
        res.json(livros);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Retorna um livro por ID
export const getLivroById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const livro: null = await Livro.findById(id);
        if (!livro) {
            res.status(404).json({ message: 'Livro não encontrado' });
            return;
        }
        res.json(livro);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Cria um novo livro
export const createLivro = async (req: Request, res: Response): Promise<void> => {
    const novoLivro = req.body;
    console.log(novoLivro);
    try {
        const livroCriado: LivroInterface = await Livro.create(novoLivro);
        res.status(201).json(livroCriado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Atualiza um livro existente
export const updateLivro = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
        const livroAtualizado: null = await Livro.findByIdAndUpdate(id, atualizacao, { new: true });
        if (!livroAtualizado) {
            res.status(404).json({ message: 'Livro não encontrado para atualização' });
            return;
        }
        res.json(livroAtualizado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Exclui um livro
export const deleteLivro = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const livroExcluido: null = await Livro.findByIdAndDelete(id);
        if (!livroExcluido) {
            res.status(404).json({ message: 'Livro não encontrado para exclusão' });
            return;
        }
        res.json({ message: 'Livro excluído com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export default { createLivro, getAllLivros, getLivroById, updateLivro, deleteLivro }