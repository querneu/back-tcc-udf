const { Usuario, AuthToken } = require('../models');
module.exports = async function (req, res, next) {
    const token =
        req.cookies.auth_token || req.headers.authorization;
    if (token) {
        const authToken = await AuthToken.findOne(
            { where: { token }, include: Usuario }
        );
        if (authToken) {
            req.usuario = authToken.Usuario;
        }
    }
    next();
}