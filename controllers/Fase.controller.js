'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const fase = await db.Fase.create(data).then(
            res.status(200).json({
                success: true,
                status: 200,
                message: "Fase criado com sucesso",
                data: fase
            })
           
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao criar fase!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const fase = await db.Fase.findAll(
            { include: [{ all: true }] }
        ).then(
            res.status(200).json({
                success: true,
                status: 200,
                message: "Fases encontrados",
                data: fase
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar fases!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findByPk = async (req, res) => {
    try {
        const fase = await db.Fase.findByPk(req.params.id,
            {
                include: [{ all: true }]
            }).then(
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Fase encontrado",
                    data: fase
                })
            ).catch((err) => {
                res.send(400).json({
                    success: false,
                    status: 400,
                    message: "Erro ao listar fase!",
                    info: err
                })
            });
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const fase = await db.Fase.update(
            req.body,
            { where: { id_fase: req.params.id } }
        ).then(
            res.status(200).json({
                success: true,
                status: 200,
                message: "Fase criado com sucesso",
                data: fase
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao criar fase!",
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
        const fase = await db.Fase.destroy({ where: { id_fase: req.params.id } }).then(
            res.status(200).json({
                success: true,
                status: 200,
                message: "Fase deletado com sucesso",
                data: fase
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao deletar fase!",
                info: err
            })
        });
    }
    catch (err) {
        res.send(err)
    }
}