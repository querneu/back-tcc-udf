const express = require('express');
const bcrypt = require('bcrypt');
const routes = express.Router();
const UsuarioController = require('../controllers/Usuario.controller')

//Registrar usuario
routes.post('/register', UsuarioController.register);
//Logar
routes.post('/login', UsuarioController.login);
//Deletar
routes.delete('/logout', UsuarioController.logout);
//Atualizar tipos de ensino por id
routes.put("/:id", UsuarioController.update);
//Listar tipos de ensino
routes.get("/", UsuarioController.findAll);
//Usuario logado
routes.get('/me', UsuarioController.me);

module.exports = routes;