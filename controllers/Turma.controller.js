'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const turma = db.Turma.create(data);
        res.send(turma);
    } catch (err) {
        res.send(err)
    }
}

exports.findAll = async (req, res) => {
    try {
        const turma = await db.Turma.findAll();
        res.send(turma);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const turma = await db.Turma.findOne({ where: { id_turma: req.params.id } });
        res.send(turma);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Turma.update(
            { ano_turma: req.params.ano_turma },
            { nome_turma: req.params.nome_turma },
            { qtd_meses: req.params.qtd_meses },
            { tipo_de_calendario: req.params.tipo_de_calendario },
            { id_tipo_ensino: req.params.id_tipo_ensino },
            { where: { id_turma: req.params.id } })
            res.send(result);
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async(req,res)=>{
    try {
        try {
            const result = await db.Turma.destroy({ where: { id_turma: req.params.id } });
            res.send(result)
        }
        catch (err) {
            res.send(err)
        }
    } catch (err) {
        res.send(err);
    }
}