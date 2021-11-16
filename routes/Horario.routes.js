const express = require('express')
const routes = express.Router()
const HorarioController = require('../controllers/Horario.controller')

routes.post("/", HorarioController.create);
routes.get("/", HorarioController.findAll);
routes.get("/:id", HorarioController.findById);
routes.put("/:id", HorarioController.update);
routes.delete("/:id", HorarioController.delete);

module.exports = routes