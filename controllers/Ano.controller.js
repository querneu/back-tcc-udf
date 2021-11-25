const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const ano = await db.Ano.create(data).then((ano) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Ano criado com sucesso!",
            data: ano
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar ano!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const ano = await db.Ano.findAll(
        { include: [{ all: true }] }
    ).then((ano) => {
        if (ano.length == 0) {
            console.log(ano.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum ano cadastrado!",
                data: ano
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Anos cadastrados!",
                data: ano
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar anos!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const ano = await db.Ano.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((ano) => {
            if (!ano) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Ano não cadastrado!",
                    data: ano
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Ano encontrado!",
                    data: ano
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar ano!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const ano = await db.Ano.update(
        req.body,
        { where: { id_ano: req.params.id } }
    ).then((ano) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Ano criado com sucesso!",
            data: ano
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar ano!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const ano = await db.Ano.destroy({ where: { id_ano: req.params.id } }).then((ano) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Ano deletado com sucesso!",
            data: ano
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar ano!",
            info: err
        })
    });

}