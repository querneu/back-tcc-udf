const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const aluno = await db.Aluno.create(data).then((aluno) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Aluno ${req.body.nome_aluno} criado com sucesso!`,
            data: aluno
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar aluno!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const aluno = await db.Aluno.findAll(
        { include: [{ all: true }] }
    ).then((aluno) => {
        if (aluno.length == 0) {
            console.log(aluno.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum aluno cadastrado!",
                data: aluno
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Alunos cadastrados!",
                data: aluno
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar alunos!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const aluno = await db.Aluno.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((aluno) => {
            if (!aluno) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Aluno não cadastrado!",
                    data: aluno
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Aluno encontrado!",
                    data: aluno
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar aluno!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const aluno = await db.Aluno.update(
        req.body,
        { where: { id_aluno: req.params.id } }
    ).then((aluno) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Aluno ${req.body.nome_aluno} atualizado com sucesso!`,
            data: aluno
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar aluno!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const aluno = await db.Aluno.destroy({ where: { id_aluno: req.params.id } }).then((aluno) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Aluno deletado com sucesso!",
            data: aluno
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar aluno!",
            info: err
        })
    });

}