const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UsuarioController = require('../controllers/Usuario.controller')

//Registrar usuario
router.post('/register', UsuarioController.register);
//Logar
router.post('/login', UsuarioController.login);
//Deletar
router.delete('/logout', UsuarioController.logout);
//Usuario logado
router.get('/me', UsuarioController.me);

module.exports = router;