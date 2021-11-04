'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const professor = await db.Professor.create(data);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const professor = await db.Professor.findAll();
        res.send(professor);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const professor = await db.Professor.findById(req.params);
        res.send(professor);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Professor.update(
            { nome_professor: req.body.nome_professor },
            { qtd_horas_trabalho: req.body.qtd_horas_trabalho },
            { matricula: req.body.matricula },
            { telefone: req.body.telefone },
            { qtd_horas_trabalho: req.body.email_professor },
            { where: { id_professor: req.params.id } });
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}


exports.delete = async (req, res) => {
    try {
        const result = await db.Professor.destroy({ where: { id_professor: req.params.id } })
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}