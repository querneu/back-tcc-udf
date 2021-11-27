const express = require('express')
const routes = express.Router()
const SerieController = require('../controllers/Serie.controller')

routes.post("/", SerieController.create);
routes.get("/", SerieController.findAll);
routes.get("/:id", SerieController.findOne);
routes.put("/:id", SerieController.update);
routes.delete("/:id", SerieController.delete);

module.exports = routes