const express = require('express')
const routes = express.Router()
const FaseController = require('../controllers/Fase.controller')

routes.post("/", FaseController.create);
routes.get("/", FaseController.findAll);
routes.get("/:id", FaseController.findOne);
routes.put("/:id", FaseController.update);
routes.delete("/:id", FaseController.delete);

module.exports = routes