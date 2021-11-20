const express = require('express')
const routes = express.Router()
const Turma = require('../controllers/Turma.controller')

routes.post("/", Turma.create);
routes.get("/", Turma.findAll);
routes.get("/:id", Turma.findById);
routes.put("/:id", Turma.update);
routes.delete("/:id", Turma.delete);

module.exports = routes