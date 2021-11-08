'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const disciplina = await db.Disciplina.create(data);
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.findAll();
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.findOne(req.params.id);
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Disciplina.update(
            { nome_disciplina: req.body.nome_disciplina },
            { aula_exclusiva: req.body.aula_exclusiva },
            { qtd_carga_horaria: req.body.qtd_carga_horaria },
            { qtd_aulas: req.body.qtd_aulas },
            { where: { id_disciplina: req.params.id } }
        )
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.Disciplina.destroy({ where: { id_disciplina: req.params.id } });
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}