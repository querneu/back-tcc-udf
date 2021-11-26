const express = require('express')
const routes = express.Router()
const TurnoController = require('../controllers/Turno.controller')

routes.post("/", TurnoController.create);
routes.get("/", TurnoController.findAll);
routes.get("/:id", TurnoController.findOne);
routes.put("/:id", TurnoController.update);
routes.delete("/:id", TurnoController.delete);

module.exports = routes