import express from "express";
import usuarioController from "../controllers/usuarioController";

const router = express.Router();

// Rota para registrar um novo usuário
router.post("/usuarios", usuarioController.register);
// Rota para login
router.post("/usuarios/login", usuarioController.login);
// Rota para criar um novo usuário
//router.post('/usuarios', usuarioController.createUsuario);
// Rota para obter todos os usuários
router.get("/usuarios", usuarioController.getAllusuarios);
// Rota para obter um usuário pelo ID
router.get("/usuarios/:id", usuarioController.getUsuarioById);
// Rota para atualizar um usuário pelo ID
router.put("/usuarios/:id", usuarioController.updateUsuario);
// Rota para excluir um usuário pelo ID
router.delete("/usuarios/:id", usuarioController.deleteUsuario);
// Rota para verificar pendências
router.get("/usuarios/:id", usuarioController.verificarPendencia);
// Rota para resolver pendências
router.get("/usuarios/:id", usuarioController.resolverPendencia);

export default router;
