const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        cod_login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        cod_perfil: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        cod_senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    Usuario.associate = function (models) {
        Usuario.hasMany(models.AuthToken);
    };
    Usuario.authenticate = async function (cod_login, cod_senha) {
        const usuario = await Usuario.findOne({ where: { cod_login } });
        if (bcrypt.compareSync(cod_senha, usuario.cod_senha)) {
            return usuario.authorize();
        }
        throw new Error('Senha inválida!');
    };
    Usuario.prototype.authorize = async function () {
        const { AuthToken } = sequelize.models;
        const usuario = this
        const authToken = await AuthToken.generate(this.id);
        await usuario.addAuthToken(authToken);
        return { usuario, authToken }
    };
    Usuario.prototype.logout = async function (token) {
        sequelize.models.AuthToken.destroy({ where: { token } });
    };
    return Usuario;
};