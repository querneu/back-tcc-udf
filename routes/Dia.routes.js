const express = require('express')
const routes = express.Router()
const DiaController = require('../controllers/Dia.controller')

routes.post("/", DiaController.create);
routes.get("/", DiaController.findAll);
routes.get("/:id", DiaController.findOne);
routes.put("/:id", DiaController.update);
routes.delete("/:id", DiaController.delete);

module.exports = routes