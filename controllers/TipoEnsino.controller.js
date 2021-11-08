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
        const tipoEnsino = await db.TipoEnsino.findAll();
        res.send(tipoEnsino);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const tipoEnsino = await db.TipoEnsino.findOne(req.params.id);
        res.send(tipoEnsino);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.TipoEnsino.update(
            { nome_tipo_ensinoe: req.body.nome_tipo_ensino },
            { where: { id_tipo_ensino: req.params.id  } }
        )
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.TipoEnsino.destroy({ where: { id_tipo_ensino: req.params.id } });
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}