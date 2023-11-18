# Biblioteca-PDM

Este projeto é um sistema online de controle de empréstimo de livros, desenvolvido com Node.js, TypeScript e MongoDB. Siga os passos abaixo para iniciar o projeto:

npm install

Configurar Variáveis de Ambiente:

Crie um arquivo .env na raiz do seu projeto com as seguintes variáveis:

MONGO_URI="sua-string-de-conexao-mongodb"
DATABASE_NAME = "biblioteca"
PORT=3000

Substitua sua-string-de-conexao-mongodb pela sua string de conexão do MongoDB.
O modelo desta URI é parecido com este: mongodb+srv://lukas:<password>@cluster0.d5xci.mongodb.net/?retryWrites=true&w=majority

Compilar e Executar o Projeto:
npm run build
npm start

O servidor estará em execução em http://localhost:3000.

Rotas Disponíveis

Livros:

GET /api/livros: Obter todos os livros
GET /api/livros/:id: Obter um livro por ID
POST /api/livros: Criar um novo livro
PUT /api/livros/:id: Atualizar um livro por ID
DELETE /api/livros/:id: Excluir um livro por ID

Usuários:

GET /api/usuarios: Obter todos os usuários
GET /api/usuarios/:id: Obter um usuário por ID
POST /api/usuarios: Criar um novo usuário
PUT /api/usuarios/:id: Atualizar um usuário por ID
DELETE /api/usuarios/:id: Excluir um usuário por ID

Empréstimos:

GET /api/emprestimos: Obter todos os empréstimos
GET /api/emprestimos/:id: Obter um empréstimo por ID
POST /api/emprestimos: Criar um novo empréstimo
PUT /api/emprestimos/:id: Atualizar um empréstimo por ID
DELETE /api/emprestimos/:id: Excluir um empréstimo por ID
