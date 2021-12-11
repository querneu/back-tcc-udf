const db = require('../models');

exports.create = async (req, res) => {
    const data = {
        id_config: 1,
        qtd_max_aulas: 2,
        exibir_percentual: 0,
        per_dois_professores: 0,
        per_carga_hor_superior: 0,
        desativar_turmas_janeiro: 0,
        desativar_turma_jul: 0,
    }
    const config = await db.Config.create(data).then((config) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Config ${req.body.nome_config} criado com sucesso!`,
            data: config
        })
    });
}

exports.findAll = async (req, res) => {
    const config = await db.Config.findAll(
        { include: [{ all: true }] }
    ).then((config) => {
        if (config.length == 0) {
            console.log(config.length)
            res.status(200).json({
                success: true,
                status: 200,
                message: "Nenhum config cadastrado!",
                data: config
            })
        } else {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Configs cadastrados!",
                data: config
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            status: 400,
            message: "Erro ao listar configs!",
            info: err
        })
    });
}

exports.findOne = async (req, res) => {
    const config = await db.Config.findByPk(req.params.id,
        {
            include: [{ all: true }]
        }).then((config) => {
            if (!config) {
                res.status(404).json({
                    success: true,
                    status: 404,
                    message: "Config não cadastrado!",
                    data: config
                })
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Config encontrado!",
                    data: config
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Erro ao listar config!",
                info: err
            })
        });
}

exports.update = async (req, res) => {
    const config = await db.Config.update(
        req.body,
        { where: { id_config: req.params.id } }
    ).then((config) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: `Config ${req.body.nome_config} atualizado com sucesso!`,
            data: config
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao criar config!",
            info: err
        })
    });
}

exports.delete = async (req, res) => {
    const config = await db.Config.destroy({ where: { id_config: req.params.id } }).then((config) => {
        res.status(200).json({
            success: true,
            status: 200,
            message: "Config deletado com sucesso!",
            data: config
        })
    }).catch((err) => {
        res.send(400).json({
            success: false,
            status: 400,
            message: "Erro ao deletar config!",
            info: err
        })
    });

}