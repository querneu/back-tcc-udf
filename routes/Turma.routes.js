const express = require('express')
const routes = express.Router()
const TurmaController = require('../controllers/Turma.controller')

//Criar novo tipo de ensino
routes.post("/",TurmaController.create);
//Listar tipos de ensino
routes.get("/", TurmaController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", TurmaController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", TurmaController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", TurmaController.delete);

module.exports = routes