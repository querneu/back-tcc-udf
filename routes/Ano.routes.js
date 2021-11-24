const express = require('express')
const routes = express.Router()
const AnoController = require('../controllers/Ano.controller')

routes.post("/", AnoController.create);
routes.get("/", AnoController.findAll);
routes.get("/:id", AnoController.findById);
routes.put("/:id", AnoController.update);
routes.delete("/:id", AnoController.delete);

module.exports = routes