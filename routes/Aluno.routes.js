const express = require('express')
const routes = express.Router()
const AlunoController = require('../controllers/Aluno.controller')

routes.post("/", AlunoController.create);
routes.get("/", AlunoController.findAll);
routes.get("/:id", AlunoController.findByPk);
routes.put("/:id", AlunoController.update);
routes.delete("/:id", AlunoController.delete);

module.exports = routes