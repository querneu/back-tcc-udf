module.exports = (sequelize, DataTypes) => {
    const Serie = sequelize.define("Serie", {
        id_serie: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_serie: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Serie.associate = function(models) {
        Serie.belongsTo(models.Ano, {
            targetKey:'id_ano',
            foreignKey : 'fk_ano',
        });
        Serie.belongsTo(models.Fase, {
            targetKey:'id_fase',
            foreignKey : 'fk_fase',
        });
    }
    return Serie;
};