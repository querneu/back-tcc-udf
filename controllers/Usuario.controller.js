'use strict';
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.cod_senha, 10);
    try {
        let usuario = await Usuario.create(
            Object.assign(req.body, { cod_senha: hash })
        );
        let data = await usuario.authorize();
        return res.json(data);
    } catch (err) {
        return res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
    const { cod_login, cod_senha } = req.body;
    if (!cod_login || !cod_senha) {
        return res.status(400).send('Faltando parametros de Login ou Senha!');
    }
    try {
        let usuario = await Usuario.authenticate(cod_login, cod_senha);
        console.log(usuario);
        return res.json(usuario);
    } catch (err) {
        console.log(err)
        return res.status(400).send('Login ou Senha inválidos!');
    }
}


exports.findAll = async (req, res) => {
    try {
        const usuario = await Usuario.findAll();
        res.send(usuario);
    } catch (err) {
        res.send(err);
    }
}



exports.update = async (req, res) => {
    const usuario = {
        cod_perfil: req.body.cod_perfil,
    }
    try {
        const result = await Usuario.update(usuario, { where: { cod_login: req.params.id } })
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}

exports.logout = async (req, res) => {
    const { cookies: { auth_token: authToken } } = req
    console.log(authToken)
    if (authToken) {
        await req.usuario.logout(authToken);
        return res.status(204).send()
    }
    return res.status(400).send(
        { errors: [{ message: 'Não autenticado!' }] }
    );
}


exports.me = function (req, res) {
    if (req.usuario) {
        return res.send(req.usuario);
    }
    res.status(404).send(
        { errors: [{ message: 'Faltando token de autenticação!' }] }
    );
}
