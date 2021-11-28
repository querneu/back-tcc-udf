const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const horario = await db.Horario.create(data).then((horario) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Horario ${req.body.nome_horario} criado com sucesso!`,
            data: horario
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar horario!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const horario = await db.Horario.findAll(
        { include: [{ all: true }] }
    ).then((horario) => {
        if (horario.length == 0) {
            console.log(horario.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum horario cadastrado!",
                data: horario
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Horarios cadastrados!",
                data: horario
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar horarios!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const horario = await db.Horario.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((horario) => {
            if (!horario) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Horario não cadastrado!",
                    data: horario
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Horario encontrado!",
                    data: horario
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar horario!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const horario = await db.Horario.update(
        req.body,
        { where: { id_horario: req.params.id } }
    ).then((horario) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Horario ${req.body.nome_horario} atualizado com sucesso!`,
            data: horario
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar horario!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const horario = await db.Horario.destroy({ where: { id_horario: req.params.id } }).then((horario) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Horario deletado com sucesso!",
            data: horario
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar horario!",
            info: err
        })
    });

}