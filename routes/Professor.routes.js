const express = require('express')
const routes = express.Router()
const ProfessorController = require('../controllers/Professor.controller')

//Criar novo tipo de ensino
routes.post("/", ProfessorController.create);
//Listar tipos de ensino
routes.get("/", ProfessorController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", ProfessorController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", ProfessorController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", ProfessorController.delete);

module.exports = routes