'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const disciplina = await db.Disciplina.create(data).then((disciplina) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "disciplina criado com sucesso",
                data: disciplina
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao criar disciplina!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.findAll(
            { include: [{ all: true }] }
        ).then((disciplina) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "disciplinas encontrados",
                data: disciplina
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar disciplinas!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.findByPk(req.params.id,
            {
                include: [{ all: true }]
            }).then((disciplina) =>
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "disciplina encontrado",
                    data: disciplina
                })
            ).catch((err) => {
                res.send(400).json({
                    success: false,
                    status: 400,
                    message: "Erro ao listar disciplina!",
                    info: err
                })
            });
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const disciplina = await db.Disciplina.update(
            req.body,
            { where: { id_disciplina: req.params.id } }
        ).then((disciplina) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "disciplina criado com sucesso",
                data: disciplina
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao criar disciplina!",
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
        const disciplina = await db.Disciplina.destroy({ where: { id_disciplina: req.params.id } }).then((disciplina) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "disciplina deletado com sucesso",
                data: disciplina
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao deletar disciplina!",
                info: err
            })
        });
    }
    catch (err) {
        res.send(err)
    }
}