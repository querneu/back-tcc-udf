const express = require('express')
const routes = express.Router()
const TurmaController = require('../controllers/Turma.controller')

routes.post("/", TurmaController.create);
routes.get("/", TurmaController.findAll);
routes.get("/:id", TurmaController.findOne);
routes.put("/:id", TurmaController.update);
routes.delete("/:id", TurmaController.delete);

module.exports = routes