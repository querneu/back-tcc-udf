const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const aula = await db.Aula.create(data).then((aula) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Aula ${req.body.nome_aula} criado com sucesso!`,
            data: aula
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar aula!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const aula = await db.Aula.findAll(
        { include: [{ all: true }] }
    ).then((aula) => {
        if (aula.length == 0) {
            console.log(aula.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum aula cadastrado!",
                data: aula
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Aulas cadastrados!",
                data: aula
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar aulas!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const aula = await db.Aula.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((aula) => {
            if (!aula) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Aula não cadastrado!",
                    data: aula
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Aula encontrado!",
                    data: aula
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar aula!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const aula = await db.Aula.update(
        req.body,
        { where: { id_aula: req.params.id } }
    ).then((aula) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Aula ${req.body.nome_aula} atualizado com sucesso!`,
            data: aula
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar aula!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const aula = await db.Aula.destroy({ where: { id_aula: req.params.id } }).then((aula) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Aula deletado com sucesso!",
            data: aula
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar aula!",
            info: err
        })
    });

}