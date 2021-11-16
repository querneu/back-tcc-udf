const express = require('express')
const routes = express.Router()
const EnsinoController = require('../controllers/Ensino.controller')

routes.post("/", EnsinoController.create);
routes.get("/", EnsinoController.findAll);
routes.get("/:id", EnsinoController.findById);
routes.put("/:id", EnsinoController.update);
routes.delete("/:id", EnsinoController.delete);
module.exports = routes