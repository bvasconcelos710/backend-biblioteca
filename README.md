# Biblioteca-PDM

Este projeto é uma API REST de um sistema online de controle de empréstimo de livros, desenvolvido com Node Js, TypeScript, Express Js, MongoDB e Mongoose. 

## Para executar o projeto:

* clone o projeto:

````bash
 git clone https://github.com/bvasconcelos710/backend-biblioteca.git
````

* instale as dependências:

````bash
 npm install
````

* Configure Variáveis de Ambiente em um arquivo .env com as seguintes variáveis:

- MONGO_URI
- DATABASE_NAME
- PORT

* Inicie o Projeto:
````bash
 npm start
````

## Rotas Disponíveis

### Livros:

* GET /api/livros: Obter todos os livros
* GET /api/livros/:id: Obter um livro por ID
* POST /api/livros: Criar um novo livro
* PUT /api/livros/:id: Atualizar um livro por ID
* DELETE /api/livros/:id: Excluir um livro por ID

### Usuários:

* GET /api/usuarios: Obter todos os usuários
* GET /api/usuarios/:id: Obter um usuário por ID
* POST /api/usuarios: Criar um novo usuário
* PUT /api/usuarios/:id: Atualizar um usuário por ID
* DELETE /api/usuarios/:id: Excluir um usuário por ID

### Empréstimos:

* GET /api/emprestimos: Obter todos os empréstimos
* GET /api/emprestimos/:id: Obter um empréstimo por ID
* POST /api/emprestimos: Criar um novo empréstimo
* PUT /api/emprestimos/:id: Atualizar um empréstimo por ID
* DELETE /api/emprestimos/:id: Excluir um empréstimo por ID
