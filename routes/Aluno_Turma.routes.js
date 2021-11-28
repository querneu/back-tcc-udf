const express = require('express')
const routes = express.Router()
const Aluno_TurmaController = require('../controllers/Aluno_Turma.controller')

routes.post("/", Aluno_TurmaController.create);
routes.get("/", Aluno_TurmaController.findAll);
routes.get("/:id", Aluno_TurmaController.findOne);
routes.put("/:id", Aluno_TurmaController.update);
routes.delete("/:id", Aluno_TurmaController.delete);

module.exports = routes