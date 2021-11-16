const express = require('express')
const routes = express.Router()
const TipoEnsinoController = require('../controllers/TipoEnsino.controller')

routes.post("/", TipoEnsinoController.create);
routes.get("/", TipoEnsinoController.findAll);
routes.get("/:id", TipoEnsinoController.findById);
routes.put("/:id", TipoEnsinoController.update);
routes.delete("/:id", TipoEnsinoController.delete);

module.exports = routes