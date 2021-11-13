const express = require('express')
const routes = express.Router()
const TurnoController = require('../controllers/Turno.controller')

//Criar novo tipo de ensino
routes.post("/",TurnoController.create);
//Listar tipos de ensino
routes.get("/", TurnoController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", TurnoController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", TurnoController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", TurnoController.delete);

module.exports = routes