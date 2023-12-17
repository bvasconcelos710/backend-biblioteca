import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.POR || 3000;

app.use(cors());
app.use(express.json());

// Chama as rotas
app.use(routes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});