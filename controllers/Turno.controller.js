const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const turno = await db.Turno.create(data).then((turno) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Turno ${req.body.nome_turno} criado com sucesso!`,
            data: turno
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar turno!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const turno = await db.Turno.findAll(
        { include: [{ all: true }] }
    ).then((turno) => {
        if (turno.length == 0) {
            console.log(turno.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum turno cadastrado!",
                data: turno
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Turnos cadastrados!",
                data: turno
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar turnos!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const turno = await db.Turno.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((turno) => {
            if (!turno) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Turno não cadastrado!",
                    data: turno
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Turno encontrado!",
                    data: turno
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar turno!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const turno = await db.Turno.update(
        req.body,
        { where: { id_turno: req.params.id } }
    ).then((turno) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Turno ${req.body.nome_turno} atualizado com sucesso!`,
            data: turno
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar turno!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const turno = await db.Turno.destroy({ where: { id_turno: req.params.id } }).then((turno) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Turno deletado com sucesso!",
            data: turno
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar turno!",
            info: err
        })
    });

}