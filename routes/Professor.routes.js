const express = require('express')
const routes = express.Router()
const ProfessorController = require('../controllers/Professor.controller')

routes.post("/", ProfessorController.create);
routes.get("/", ProfessorController.findAll);
routes.get("/:id", ProfessorController.findOne);
routes.put("/:id", ProfessorController.update);
routes.delete("/:id", ProfessorController.delete);

module.exports = routes