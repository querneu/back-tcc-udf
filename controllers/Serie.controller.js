const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    const serie = await db.Serie.create(data).then((serie) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Serie ${req.body.nome_serie} criado com sucesso!`,
            data: serie
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar serie!",
            info: err
        })
    });
}

exports.findAll = async (req, res) => {
    const serie = await db.Serie.findAll(
        { include: [{ all: true }] }
    ).then((serie) => {
        if (serie.length == 0) {
            console.log(serie.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum serie cadastrado!",
                data: serie
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Series cadastrados!",
                data: serie
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar series!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const serie = await db.Serie.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((serie) => {
            if (!serie) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Serie não cadastrado!",
                    data: serie
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Serie encontrado!",
                    data: serie
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar serie!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const serie = await db.Serie.update(
        req.body,
        { where: { id_serie: req.params.id } }
    ).then((serie) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Serie ${req.body.nome_serie} atualizado com sucesso!`,
            data: serie
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar serie!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const serie = await db.Serie.destroy({ where: { id_serie: req.params.id } }).then((serie) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Serie deletado com sucesso!",
            data: serie
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar serie!",
            info: err
        })
    });

}