const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const dia = await db.Dia.create(data).then((dia) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Dia criado com sucesso",
                data: dia
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao criar dia!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const dia = await db.Dia.findAll(
            { include: [{ all: true }] }
        ).then((dia) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Dias encontrados",
                data: dia
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar dias!",
                info: err
            })
        });
    } catch (err) {
        res.send(err);
    }
}

exports.findByPk = async (req, res) => {
    try {
        const dia = await db.Dia.findByPk(req.params.id,
            {
                include: [{ all: true }]
            }).then((dia) =>
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Dia encontrado",
                    data: dia
                })
            ).catch((err) => {
                res.send(400).json({
                    success: false,
                    status: 400,
                    message: "Erro ao listar dia!",
                    info: err
                })
            });
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const dia = await db.Dia.update(
            req.body,
            { where: { id_dia: req.params.id } }
        ).then((dia) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Dia criado com sucesso",
                data: dia
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao criar dia!",
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
        const dia = await db.Dia.destroy({ where: { id_dia: req.params.id } }).then((dia) =>
            res.status(200).json({
                success: true,
                status: 200,
                message: "Dia deletado com sucesso",
                data: dia
            })
        ).catch((err) => {
            res.send(400).json({
                success: false,
                status: 400,
                message: "Erro ao deletar dia!",
                info: err
            })
        });
    }
    catch (err) {
        res.send(err)
    }
}