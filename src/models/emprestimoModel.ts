import { Schema, Document } from "mongoose";
import mongoose from '../db/db';

import { LivroInterface } from './livroModel';
import { UsuarioInterface } from './usuarioModel';

export interface EmprestimoInterface extends Document {
    dataEmprestimo: Date;
    dataEntrega: Date;
    livro: LivroInterface;
    usuario: UsuarioInterface;
}

const EmprestimoSchema: Schema = new Schema({
    dataEmprestimo: { type: Date, required: true },
    dataEntrega: { type: Date, required: true },
    livro: [{ type: Schema.Types.ObjectId, ref: 'Livro' }],
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { collection: 'emprestimos' });

const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);
export default Emprestimo;