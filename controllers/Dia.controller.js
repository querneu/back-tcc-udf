const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const dia = await db.Dia.create(data).then((dia) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Dia ${req.body.nome_dia} criado com sucesso!`,
            data: dia
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar dia!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const dia = await db.Dia.findAll(
        { include: [{ all: true }] }
    ).then((dia) => {
        if (dia.length == 0) {
            console.log(dia.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum dia cadastrado!",
                data: dia
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Dias cadastrados!",
                data: dia
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar dias!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const dia = await db.Dia.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((dia) => {
            if (!dia) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Dia não cadastrado!",
                    data: dia
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Dia encontrado!",
                    data: dia
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar dia!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const dia = await db.Dia.update(
        req.body,
        { where: { id_dia: req.params.id } }
    ).then((dia) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Dia ${req.body.nome_dia} atualizado com sucesso!`,
            data: dia
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar dia!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const dia = await db.Dia.destroy({ where: { id_dia: req.params.id } }).then((dia) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Dia deletado com sucesso!",
            data: dia
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar dia!",
            info: err
        })
    });

}