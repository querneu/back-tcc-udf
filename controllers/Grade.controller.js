const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const grade = await db.Grade.create(data).then((grade) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Grade ${req.body.nome_grade} criado com sucesso!`,
            data: grade
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar grade!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const grade = await db.Grade.findAll(
        { include: [{ all: true }] }
    ).then((grade) => {
        if (grade.length == 0) {
            console.log(grade.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum grade cadastrado!",
                data: grade
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Grades cadastrados!",
                data: grade
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar grades!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const grade = await db.Grade.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((grade) => {
            if (!grade) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Grade não cadastrado!",
                    data: grade
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Grade encontrado!",
                    data: grade
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar grade!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const grade = await db.Grade.update(
        req.body,
        { where: { id_grade: req.params.id } }
    ).then((grade) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Grade ${req.body.nome_grade} atualizado com sucesso!`,
            data: grade
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar grade!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const grade = await db.Grade.destroy({ where: { id_grade: req.params.id } }).then((grade) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Grade deletado com sucesso!",
            data: grade
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar grade!",
            info: err
        })
    });

}