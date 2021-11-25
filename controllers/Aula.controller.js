const { Sequelize } = require('../models');
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const aula = db.Aula.create(data);
        res.send(aula);
    } catch (err) {
        res.send(err)
    }
}

exports.findAll = async (req, res) => {
    try {

        const aula = await db.Aula.findAll({
            include: [{ all:true }]
        });
        res.send(aula);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const aula = await db.Aula.findByPk(req.params.id, { include: [{ all:true }] });
        res.send(aula);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Aula.update(req.body, { where: { id_aula: req.params.id } })
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        try {
            const result = await db.Aula.destroy({ where: { id_aula: req.params.id } });
            res.status(200).JSON(result);
        }
        catch (err) {
            res.send(err)
        }
    } catch (err) {
        res.send(err);
    }
}