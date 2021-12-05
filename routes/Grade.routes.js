const express = require('express')
const routes = express.Router()
const GradeController = require('../controllers/Grade.controller')

routes.post("/", GradeController.create);
routes.get("/", GradeController.findAll);
routes.post("/generate", GradeController.generate);
routes.get("/:id", GradeController.findOne);
routes.put("/:id", GradeController.update);
routes.delete("/:id", GradeController.delete);

module.exports = routes