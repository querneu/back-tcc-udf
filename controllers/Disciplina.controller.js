'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const disciplina = await db.Disciplina.create(data,{ include: db.Professor });
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.findAll({ include: db.Professor });
        res.send(disciplina);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    console.log(req.params.id)
    try {
        const disciplina = await db.Disciplina.findByPk(req.params.id,{ include: db.Professor });
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
        res.status(200).JSON(result);
    }
    catch (err) {
        res.send(err)
    }
}