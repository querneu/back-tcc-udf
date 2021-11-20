'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const turno = db.Turno.create(data);
        res.send(turno);
    } catch (err) {
        res.send(err)
    }
}

exports.findAll = async (req, res) => {
    try {
        const turno = await db.Turno.findAll();
        res.send(turno);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const turno = await db.Turno.findOne({ where: { id_turno: req.params.id } });
        res.send(turno);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Turno.update(req.body, { where: { id_turno: req.params.id } })
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        try {
            const result = await db.Turno.destroy({ where: { id_turno: req.params.id } });
            res.status(200).JSON(result);
        }
        catch (err) {
            res.send(err)
        }
    } catch (err) {
        res.send(err);
    }
}