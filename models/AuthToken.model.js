module.exports = (sequelize, DataTypes) => {

    const AuthToken = sequelize.define('AuthToken', {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {});
  
    // set up the associations so we can make queries that include
    // the related objects
    AuthToken.associate = function({ Usuario }) {
      AuthToken.belongsTo(Usuario);
    };
  
    // generates a random 15 character token and
    // associates it with a Usuario
    AuthToken.generate = async function(UsuarioId) {
      if (!UsuarioId) {
        throw new Error('AuthToken requires a Usuario ID')
      }
  
      let token = '';
  
      const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';
  
      for (var i = 0; i < 15; i++) {
        token += possibleCharacters.charAt(
          Math.floor(Math.random() * possibleCharacters.length)
        );
      }
  
      return AuthToken.create({ token, UsuarioId })
    }
  
    return AuthToken;
  };