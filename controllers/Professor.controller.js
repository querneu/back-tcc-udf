const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const professor = await db.Professor.create(data).then((professor) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Professor ${req.body.nome_professor} criado com sucesso!`,
            data: professor
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar professor!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const professor = await db.Professor.findAll(
        { include: [{ all: true }] }
    ).then((professor) => {
        if (professor.length == 0) {
            console.log(professor.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum professor cadastrado!",
                data: professor
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Professores cadastrados!",
                data: professor
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar professors!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const professor = await db.Professor.findByPk(req.Params.id,
        {
            include: [{ all: true }]
        }).then((professor) => {
            if (!professor) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Professor não cadastrado!",
                    data: professor
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Professor encontrado!",
                    data: professor
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar professor!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const professor = await db.Professor.update(
        req.body,
        { where: { id_professor: req.params.id } }
    ).then((professor) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Professor ${req.body. nome_professor} atualizado com sucesso!`,
            data: professor
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar professor!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const professor = await db.Professor.destroy({ where: { id_professor: req.params.id } }).then((professor) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Professor deletado com sucesso!",
            data: professor
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar professor!",
            info: err
        })
    });

}