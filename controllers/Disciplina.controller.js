const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const disciplina = await db.Disciplina.create(data).then((disciplina) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Disciplina ${req.body.nome_disciplina} criado com sucesso!`,
            data: disciplina
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar disciplina!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const disciplina = await db.Disciplina.findAll(
        { include: [{ all: true }] }
    ).then((disciplina) => {
        if (disciplina.length == 0) {
            console.log(disciplina.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum disciplina cadastrado!",
                data: disciplina
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Disciplinas cadastrados!",
                data: disciplina
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar disciplinas!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const disciplina = await db.Disciplina.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((disciplina) => {
            if (!disciplina) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Disciplina não cadastrado!",
                    data: disciplina
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Disciplina encontrado!",
                    data: disciplina
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar disciplina!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const disciplina = await db.Disciplina.update(
        req.body,
        { where: { id_disciplina: req.params.id } }
    ).then((disciplina) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Disciplina ${req.body.nome_disciplina} atualizado com sucesso!`,
            data: disciplina
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar disciplina!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const disciplina = await db.Disciplina.destroy({ where: { id_disciplina: req.params.id } }).then((disciplina) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Disciplina deletado com sucesso!",
            data: disciplina
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar disciplina!",
            info: err
        })
    });

}