const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const turma = await db.Turma.create(data).then((turma) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Turma ${req.body.nome_turma} criado com sucesso!`,
            data: turma
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar turma!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const turma = await db.Turma.findAll(
        { include: [{ all: true }] }
    ).then((turma) => {
        if (turma.length == 0) {
            console.log(turma.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum turma cadastrado!",
                data: turma
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Turmas cadastrados!",
                data: turma
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar turmas!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const turma = await db.Turma.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((turma) => {
            if (!turma) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Turma não cadastrado!",
                    data: turma
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Turma encontrado!",
                    data: turma
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar turma!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const turma = await db.Turma.update(
        req.body,
        { where: { id_turma: req.params.id } }
    ).then((turma) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Turma ${req.body.nome_turma} atualizado com sucesso!`,
            data: turma
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar turma!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const turma = await db.Turma.destroy({ where: { id_turma: req.params.id } }).then((turma) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Turma deletado com sucesso!",
            data: turma
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar turma!",
            info: err
        })
    });

}