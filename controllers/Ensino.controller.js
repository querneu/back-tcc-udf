'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const ensino = await db.Ensino.create(data);
        res.send(ensino);
    } catch (err) {
        res.send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        const ensino = await db.Ensino.findAll();
        res.send(ensino);
    } catch (err) {
        res.send(err);
    }
}

exports.findById = async (req, res) => {
    try {
        const ensino = await db.Ensino.findOne({ where: { id_ensino: req.params.id } });
        res.send(ensino);
    } catch (err) {
        res.send(err);
    }
}

exports.update = async (req, res) => {
    try {
        const result = await db.Ensino.update(req.body, { where: { id_ensino: req.params.id } }
        )
        res.send(result)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await db.Ensino.destroy({ where: { id_ensino: req.params.id } });
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
}