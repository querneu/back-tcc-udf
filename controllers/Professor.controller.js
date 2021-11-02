'use strict';
const db = require('../models');

exports.create = async (req, res) => {
    const data = req.body;
    try{
        const professor = await db.Professor.create(data);
    }catch(err){
        res.send(err);
    }
}

exports.findAll = async(req, res)=>{
    try{
        const professor = await db.Professor.findAll();
        res.send(professor);
    }catch(err){
        res.send(err);
    }
}

exports.findById = async(req, res)=>{
    
}