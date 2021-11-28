module.exports = (sequelize, DataTypes) => {
    const Horario = sequelize.define("Horario", {
        id_horario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_horario: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Horario.associate = function(models) {
        Horario.belongsTo(models.Turno, {
            targetKey:'id_turno',
            foreignKey : 'fk_turno',
        });
        Horario.belongsTo(models.Dia, {
            targetKey:'id_dia',
            foreignKey : 'fk_dia',
        });
    }
    return Horario;
};