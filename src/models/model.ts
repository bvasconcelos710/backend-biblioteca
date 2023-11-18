import { ObjectId } from 'mongodb';
import {getDB } from '../db/db';

export interface Livro {
  _id: ObjectId;
  ISBN: string;
  titulo: string;
  autor: string;
  ano: number;
}

export interface Usuario {
  _id: ObjectId;
  matricula: string;
  categoria: 'aluno' | 'professor';
  nome: string;
  telefone: string;
  email: string;
  estado: {
    pendenciaDeDevolucao: boolean; // Adiciona o campo de pendência de devolução
    podeFazerEmprestimo: boolean; // Adiciona o campo de permissão para fazer empréstimo
  }
}

export interface Emprestimo {
  _id: ObjectId;
  dataEmprestimo: Date;
  dataEntrega: Date;
  livros: Livro[];
  usuario: Usuario;
  diasDesdeUltimoEmprestimo: number;
  duracaoMaxima: number; // Adiciona o campo de duração máxima do empréstimo
}

export const LivroModel = {
  async createLivro(livro: Livro): Promise<void> {
    await getDB().collection<Livro>('livros').insertOne(livro);
  },

  async getLivros(): Promise<Livro[]> {
    return getDB().collection<Livro>('livros').find().toArray();
  },

  async getLivroById(id: ObjectId): Promise<Livro | null> {
    return getDB().collection<Livro>('livros').findOne({ _id: id });
  },

  async updateLivro(id: ObjectId, livro: Livro): Promise<void> {
    await getDB().collection<Livro>('livros').updateOne({ _id: id }, { $set: livro });
  },

  async deleteLivro(id: ObjectId): Promise<void> {
    await getDB().collection<Livro>('livros').deleteOne({ _id: id });
  },
};

export const UsuarioModel = {
  
  async getUsuarioComPendencias(usuarioId: ObjectId): Promise<Usuario | null> {
    const usuario = await getDB().collection<Usuario>('usuarios').findOne({ _id: usuarioId });

    if (usuario && usuario.estado.pendenciaDeDevolucao) {
      // Verifica se existem pendências e se a data de entrega foi ultrapassada
      const emprestimoAtrasado = await getDB().collection<Emprestimo>('emprestimos').findOne({
        'usuario._id': usuarioId,
        'dataEntrega': { $lt: new Date() },
      });

      if (emprestimoAtrasado) {
        // Se houver um empréstimo atrasado, define 'podeFazerEmprestimo' como false
        usuario.estado.podeFazerEmprestimo = false;
      } else {
        // Se não houver empréstimos atrasados, define 'podeFazerEmprestimo' como true
        usuario.estado.podeFazerEmprestimo = true;
      }
    }

    return usuario;
  },

  async resolverPendencia(usuarioId: ObjectId): Promise<void> {
    await getDB().collection<Usuario>('usuarios').updateOne( // Atualiza o usuário
      { _id: usuarioId }, // Filtra pelo ID do usuário
      { $set: { 'estado.pendenciaDeDevolucao': false, 'estado.podeFazerEmprestimo': true } } // Atualiza os campos de estado
    );
  },
 
  async createUsuario(usuario: Usuario): Promise<void> {
    await getDB().collection<Usuario>('usuarios').insertOne(usuario);
  },

  async getUsuarios(): Promise<Usuario[]> {
    return getDB().collection<Usuario>('usuarios').find().toArray();
  },

  async getUsuarioById(id: ObjectId): Promise<Usuario | null> {
    return getDB().collection<Usuario>('usuarios').findOne({ _id: id });
  },

  async updateUsuario(id: ObjectId, usuario: Usuario): Promise<void> {
    await getDB().collection<Usuario>('usuarios').updateOne({ _id: id }, { $set: usuario });
  },

  async deleteUsuario(id: ObjectId): Promise<void> {
    await getDB().collection<Usuario>('usuarios').deleteOne({ _id: id });
  },
};

export const EmprestimoModel = {
  async createEmprestimo(emprestimo: Emprestimo): Promise<void> {
    await getDB().collection<Emprestimo>('emprestimos').insertOne(emprestimo);
  },

  async getEmprestimos(): Promise<Emprestimo[]> {
    return getDB().collection<Emprestimo>('emprestimos').find().toArray();
  },

  async getEmprestimoById(id: ObjectId): Promise<Emprestimo | null> {
    return getDB().collection<Emprestimo>('emprestimos').findOne({ _id: id });
  },

  async updateEmprestimo(id: ObjectId, emprestimo: Emprestimo): Promise<void> {
    await getDB().collection<Emprestimo>('emprestimos').updateOne({ _id: id }, { $set: emprestimo });
  },

  async deleteEmprestimo(id: ObjectId): Promise<void> {
    await getDB().collection<Emprestimo>('emprestimos').deleteOne({ _id: id });
  },
};
