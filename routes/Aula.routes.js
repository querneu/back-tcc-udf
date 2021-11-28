const express = require('express')
const routes = express.Router()
const AulaController = require('../controllers/Aula.controller')

routes.post("/", AulaController.create);
routes.get("/", AulaController.findAll);
routes.get("/:id", AulaController.findOne);
routes.put("/:id", AulaController.update);
routes.delete("/:id", AulaController.delete);

module.exports = routes