const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const aluno_turma = await db.Aluno_Turma.create(data).then((aluno_turma) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Aluno em Turma ${req.body.id_aluno_turma} criado com sucesso!`,
            data: aluno_turma
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar Aluno em Turma!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const aluno_turma = await db.Aluno_Turma.findAll(
        { include: [{ all: true }] }
    ).then((aluno_turma) => {
        if (aluno_turma.length == 0) {
            console.log(aluno_turma.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum Aluno em Turma cadastrado!",
                data: aluno_turma
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Aluno em Turmas cadastrados!",
                data: aluno_turma
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar Aluns em Turmas!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const aluno_turma = await db.Aluno_Turma.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((aluno_turma) => {
            if (!aluno_turma) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Aluno_turma não cadastrado!",
                    data: aluno_turma
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Aluno_turma encontrado!",
                    data: aluno_turma
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar Aluno em Turma!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const aluno_turma = await db.Aluno_Turma.update(
        req.body,
        { where: { id_aluno_turma: req.params.id } }
    ).then((aluno_turma) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Aluno em Turma atualizado com sucesso!`,
            data: aluno_turma
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar Aluno em Turma!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const aluno_turma = await db.Aluno_Turma.destroy({ where: { id_aluno_turma: req.params.id } }).then((aluno_turma) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Aluno_turma deletado com sucesso!",
            data: aluno_turma
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar Aluno em Turma!",
            info: err
        })
    });

}