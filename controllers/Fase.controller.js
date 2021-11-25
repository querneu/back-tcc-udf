const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const fase = await db.Fase.create(data).then((fase) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Fase ${req.body.nome_fase} criado com sucesso!`,
            data: fase
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar fase!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const fase = await db.Fase.findAll(
        { include: [{ all: true }] }
    ).then((fase) => {
        if (fase.length == 0) {
            console.log(fase.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum fase cadastrado!",
                data: fase
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Fases cadastrados!",
                data: fase
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar fases!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const fase = await db.Fase.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((fase) => {
            if (!fase) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Fase não cadastrado!",
                    data: fase
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Fase encontrado!",
                    data: fase
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar fase!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const fase = await db.Fase.update(
        req.body,
        { where: { id_fase: req.params.id } }
    ).then((fase) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Fase ${req.body.nome_fase} atualizado com sucesso!`,
            data: fase
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar fase!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const fase = await db.Fase.destroy({ where: { id_fase: req.params.id } }).then((fase) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Fase deletado com sucesso!",
            data: fase
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar fase!",
            info: err
        })
    });

}