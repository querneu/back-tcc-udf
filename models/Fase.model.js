module.exports = (sequelize, DataTypes) => {
    const Fase = sequelize.define("Fase", {
        id_fase: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_fase: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Fase.associate = function (models) {
        Fase.hasMany(models.Serie, {
            sourceKey: 'id_fase',
            foreignKey: 'fk_fase'
        }
        );
    }
    return Fase;
};