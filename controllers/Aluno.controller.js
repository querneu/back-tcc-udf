'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const aluno = await db.Aluno.create(data);
        res.send(aluno);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const aluno = await db.Aluno.findAll({ include: [{ model: db.Turma, as: 'Turma' }] });
        res.send(aluno);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const aluno = await db.Aluno.findByPk(req.params.id, { include: [{ model: db.Turma, as: 'Turma' }] });
        res.send(aluno);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Aluno.update(req.body, { where: { id_aluno: req.params.id } }
        )
        res.send(result)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.Aluno.destroy({ where: { id_aluno: req.params.id } });
        res.status(200).JSON(result);
    }
    catch (err) {
        res.send(err)
    }
}