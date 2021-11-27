const express = require('express')
const routes = express.Router()
const MateriaController = require('../controllers/Materia.controller')

routes.post("/", MateriaController.create);
routes.get("/", MateriaController.findAll);
routes.get("/:id", MateriaController.findOne);
routes.put("/:id", MateriaController.update);
routes.delete("/:id", MateriaController.delete);

module.exports = routes