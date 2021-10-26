const express = require('express')
const routes = express.Router()
const TipoEnsinoController = require('../controllers/TipoEnsino.controller')

//Criar novo tipo de ensino
routes.post("/",TipoEnsinoController.create);
//Listar tipos de ensino
routes.get("/", TipoEnsinoController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", TipoEnsinoController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", TipoEnsinoController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", TipoEnsinoController.delete);

module.exports = routes