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
        const aluno = await db.Aluno.findAll();
        res.send(aluno);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const aluno = await db.Aluno.findOne({ where: { id_aluno: req.params.id } });
        res.send(aluno);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Aluno.update(
            { nome_aluno: req.body.nome_aluno },
            { data_nascimento: req.body.data_nascimento },
            { sexo: req.body.sexo },
            { matricula: req.body.matricula },
            { telefone: req.body.telefone },
            { email: req.body.email },
            { where: { id_aluno: req.params.id } }
        )
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.Aluno.destroy({ where: { id_aluno: req.params.id } });
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}