import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './db/db';
import livroRoutes from './routes/livrosRoutes';
import usuarioRoutes from './routes/usuarioRoutes'; 
import emprestimoRoutes from './routes/emprestimoRoutes';


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// Conectar ao MongoDB
connectDB();

// Rotas relacionadas ao Livro
app.use('/api/', livroRoutes);

// Rotas relacionadas ao Usuário
app.use('/api/', usuarioRoutes);  

// Rotas relacionadas ao Empréstimo
app.use('/api/', emprestimoRoutes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});