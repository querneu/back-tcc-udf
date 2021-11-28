const express = require('express')
const routes = express.Router()
const ConfigController = require('../controllers/Config.controller')

routes.post("/", ConfigController.create);
routes.get("/", ConfigController.findAll);
routes.get("/:id", ConfigController.findOne);
routes.put("/:id", ConfigController.update);
routes.delete("/:id", ConfigController.delete);

module.exports = routes