'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const horario = await db.Horario.create(data);
        res.send(horario);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const horario = await db.Horario.findAll();
        res.send(horario);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const horario = await db.Horario.findOne(req.params);
        res.send(horario);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Horario.update(
            { nom_horario: req.body.nom_horario },
            { num_ordem: req.body.num_ordem },
            { where: { id_horario: req.params.id } }
        )
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.Horario.destroy({ where: { horario: req.params.id } });
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}