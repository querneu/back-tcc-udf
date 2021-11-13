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
        const disciplina = await db.Disciplina.findAll({ include: ['Ensino'] });
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.findOne({ include: ['Ensino'] },{ where: { id_disciplina: req.params.id } });
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Disciplina.update(req.body,
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