const express = require('express')
const routes = express.Router()
const DisciplinaController = require('../controllers/Disciplina.controller')

//Criar novo tipo de ensino
routes.post("/",DisciplinaController.create);
//Listar tipos de ensino
routes.get("/", DisciplinaController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", DisciplinaController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", DisciplinaController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", DisciplinaController.delete);

module.exports = routes