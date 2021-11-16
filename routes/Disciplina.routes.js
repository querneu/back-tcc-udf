const express = require('express')
const routes = express.Router()
const DisciplinaController = require('../controllers/Disciplina.controller')

routes.post("/", DisciplinaController.create);
routes.get("/", DisciplinaController.findAll);
routes.get("/:id", DisciplinaController.findById);
routes.put("/:id", DisciplinaController.update);
routes.delete("/:id", DisciplinaController.delete);

module.exports = routes