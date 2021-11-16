const express = require('express');
const bcrypt = require('bcrypt');
const routes = express.Router();
const UsuarioController = require('../controllers/Usuario.controller')

routes.post('/register', UsuarioController.register);
routes.post('/login', UsuarioController.login);
routes.delete('/logout', UsuarioController.logout);
routes.delete('/:id', UsuarioController.delete);
routes.put("/:id", UsuarioController.update);
routes.get("/", UsuarioController.findAll);
routes.get('/me', UsuarioController.me);

module.exports = routes;