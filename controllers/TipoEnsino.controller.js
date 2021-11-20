'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const tipoEnsino = await db.TipoEnsino.create(data);
        res.send(tipoEnsino);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const tipoEnsino = await db.TipoEnsino.findAll({ include: { model: db.Turma, as: 'Turma' }});
        res.send(tipoEnsino);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const tipoEnsino = await db.TipoEnsino.findByPk(req.params.id, { include: db.Turma, as: 'Turma' });
        res.send(tipoEnsino);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.TipoEnsino.update(req.body, { where: { id_tipo_ensino: req.params.id } })
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.TipoEnsino.destroy({ where: { id_tipo_ensino: req.params.id } });
        res.status(200).JSON(result);
    }
    catch (err) {
        res.send(err)
    }
}