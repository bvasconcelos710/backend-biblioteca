import { Schema, Document } from "mongoose";
import mongoose from '../db/db';

export interface LivroInterface extends Document {
    ISBN: string;
    titulo: string;
    autor: string;
    ano: string;
}

const LivroSchema: Schema = new Schema({
    ISBN: { type: String, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    ano: { type: String, required: true },
}, { collection: 'livros' });

const Livro = mongoose.model('Livro', LivroSchema);

export default Livro;