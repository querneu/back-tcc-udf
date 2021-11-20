'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const turma = db.Turma.create(data);
        res.send(turma);
    } catch (err) {
        res.send(err)
    }
}

exports.findAll = async (req, res) => {
    try {

        const turma = await db.Turma.findAll({ include: [{ model: db.Aluno, as: 'Alunos' }] });

        console.log(turma)
        res.send(turma);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const turma = await db.Turma.findByPk(req.params.id, { include: [{ model: db.Aluno, as: 'Alunos' }] });
        res.send(turma);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Turma.update(req.body, { where: { id_turma: req.params.id } })
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        try {
            const result = await db.Turma.destroy({ where: { id_turma: req.params.id } });
            res.status(200).JSON(result);
        }
        catch (err) {
            res.send(err)
        }
    } catch (err) {
        res.send(err);
    }
}