const express = require('express')
const routes = express.Router()
const EnsinoController = require('../controllers/Ensino.controller')

//Criar novo tipo de ensino
routes.post("/", EnsinoController.create);
//Listar tipos de ensino
routes.get("/", EnsinoController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", EnsinoController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", EnsinoController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", EnsinoController.delete);

module.exports = routes