import { Schema, Document } from "mongoose";
import mongoose from '../db/db';
import bcrypt from "bcrypt";

export type Categoria = 'aluno' | 'professor';

export interface UsuarioInterface extends Document {
    matricula: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    categoria: Categoria;
    estado: {
        pendenciaDeDevolucao: boolean;
        podeFazerEmprestimo: boolean;
    };
}

const UsuarioSchema: Schema = new Schema({
    matricula: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    senha: { type: String, required: true },
    categoria: { type: String, enum: ['aluno', 'professor'], required: true },
    estado: {
        pendenciaDeDevolucao: { type: Boolean, default: false },
        podeFazerEmprestimo: { type: Boolean, default: true }
    }
}, { collection: 'usuarios' });

// Antes de salvar no banco de dados, criptografa a senha
UsuarioSchema.pre<UsuarioInterface>('save', async function (next) {
    if (!this.isModified('senha')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.senha, 10);
        this.senha = hashedPassword;
        return next();
    } catch (error: any) {
        return next(error);
    }
});

// Método para comparar senhas no modelo de usuário
UsuarioSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.senha);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;