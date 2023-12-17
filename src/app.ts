import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Chama as rotas
app.use(routes);

// Inicializar o servidor
app.listen(PORT, "192.168.2.106", () => console.log(`Server running on port ${PORT}`));