'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const ano = await db.Ano.create(data).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "ano criado com sucesso",
                data: ano
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao criar ano!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const ano = await db.Ano.findAll(
            { include: [{ all: true }] }
        ).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "anos encontrados",
                data: ano
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao listar anos!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const ano = await db.Ano.findByPk(req.params.id,
            {
                include: [{ all: true }]
            }).then(
                res.status(200).JSON({
                    success: true,
                    status: 200,
                    message: "ano encontrado",
                    data: ano
                })
            ).catch((err) => {
                res.send(400).JSON({
                    success: false,
                    status: 400,
                    message: "Erro ao listar ano!",
                    info: err
                })
            });
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const ano = await db.Ano.update(
            req.body,
            { where: { id_ano: req.params.id } }
        ).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "ano criado com sucesso",
                data: ano
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao criar ano!",
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
        const ano = await db.Ano.destroy({ where: { id_ano: req.params.id } }).then(
            res.status(200).JSON({
                success: true,
                status: 200,
                message: "ano deletado com sucesso",
                data: ano
            })
        ).catch((err) => {
            res.send(400).JSON({
                success: false,
                status: 400,
                message: "Erro ao deletar ano!",
                info: err
            })
        });
    }
    catch (err) {
        res.send(err)
    }
}