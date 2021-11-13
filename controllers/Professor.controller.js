'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const professor = await db.Professor.create(data);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const professor = await db.Professor.findAll({ include: ['Ensino'] });
        res.send(professor);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const professor = await db.Professor.findOne({ include: ["Ensino"] },{ where: { id_professor: req.params.id } });
        res.send(professor);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Professor.update(req.body, { where: { id_professor: req.params.id } });
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}


exports.delete = async (req, res) => {
    try {
        const result = await db.Professor.destroy({ where: { id_professor: req.params.id } })
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}