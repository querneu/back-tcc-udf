'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const aluno = await db.Aluno.create(data).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "Aluno criado com sucesso",
                data: aluno
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao criar Aluno!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const aluno = await db.Aluno.findAll(
            { include: [{ all: true }] }
        ).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "Alunos encontrados",
                data: aluno
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao listar Alunos!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const aluno = await db.Aluno.findByPk(req.params.id,
            {
                include: [{ all: true }]
            }).then(
                res.status(200).JSON({
                    success: true,
                    status: 200,
                    message: "Aluno encontrado",
                    data: aluno
                })
            ).catch((err) => {
                res.send(400).JSON({
                    success: false,
                    status: 400,
                    message: "Erro ao listar Aluno!",
                    info: err
                })
            });
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const aluno = await db.Aluno.update(
            req.body,
            { where: { id_aluno: req.params.id } }
        ).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "Aluno criado com sucesso",
                data: aluno
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao criar Aluno!",
                info: err
            })
        });
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const aluno = await db.Aluno.destroy({ where: { id_aluno: req.params.id } }).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "Aluno deletado com sucesso",
                data: aluno
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao deletar Aluno!",
                info: err
            })
        });
    }
    catch (err) {
        res.send(err)
    }
}