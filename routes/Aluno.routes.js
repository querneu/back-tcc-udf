const express = require('express')
const routes = express.Router()
const AlunoController = require('../controllers/Aluno.controller')

//Criar novo tipo de ensino
routes.post("/",AlunoController.create);
//Listar tipos de ensino
routes.get("/", AlunoController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", AlunoController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", AlunoController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", AlunoController.delete);

module.exports = routes