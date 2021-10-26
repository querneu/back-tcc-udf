const express = require('express')
const routes = express.Router()
const HorarioController = require('../controllers/Horario.controller')

//Criar novo tipo de ensino
routes.post("/",HorarioController.create);
//Listar tipos de ensino
routes.get("/", HorarioController.findAll);
//Listar tipos de ensino por id
routes.get("/:id", HorarioController.findById);
//Atualizar tipos de ensino por id
routes.put("/:id", HorarioController.update);
//Deletar tipos de ensino por id
routes.delete("/:id", HorarioController.delete);

module.exports = routes