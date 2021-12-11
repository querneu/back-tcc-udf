const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const materia = await db.Materia.create(data).then((materia) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Materia ${req.body.materia} criado com sucesso!`,
            data: materia
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar materia!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const materia = await db.Materia.findAll(
        { include: [{ all: true }] }
    ).then((materia) => {
        if (materia.length == 0) {
            console.log(materia.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum materia cadastrado!",
                data: materia
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Materiaes cadastrados!",
                data: materia
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar materias!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const materia = await db.Materia.findByPk(req.Params.id,
        {
            include: [{ all: true }]
        }).then((materia) => {
            if (!materia) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Materia não cadastrado!",
                    data: materia
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Materia encontrado!",
                    data: materia
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar materia!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const materia = await db.Materia.update(
        req.body,
        { where: { id_materia: req.Params.id } }
    ).then((materia) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Materia ${req.body.nome_materia} atualizado com sucesso!`,
            data: materia
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar materia!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const materia = await db.Materia.destroy({ where: { materia: req.Params.id } }).then((materia) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Materia deletado com sucesso!",
            data: materia
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar materia!",
            info: err
        })
    });

}