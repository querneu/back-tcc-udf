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
        const horario = await db.Horario.findOne({ where: { id_horario: req.params.id } });
        res.send(horario);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Horario.update(req.body, { where: { id_horario: req.params.id } })
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.Horario.destroy({ where: { horario: req.params.id } });
        res.status(200).JSON(result);
    }
    catch (err) {
        res.send(err)
    }
}