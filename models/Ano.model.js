module.exports = (sequelize, DataTypes) => {
    const Ano = sequelize.define("Ano", {
        id_ano: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_ano: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Ano.associate = function (models) {
        Ano.hasMany(models.Serie, {
            sourceKey: 'id_ano', 
            foreignKey: 'fk_ano'
        }
        );
    }
    return Ano;
};