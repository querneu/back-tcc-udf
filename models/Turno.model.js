module.exports = (sequelize, DataTypes) => {
    const Turno = sequelize.define("Turno", {
        id_turno: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_turno: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Turno.associate = function (models) {
        Turno.hasMany(models.Horario, {
            sourceKey: 'id_turno', 
            foreignKey: 'fk_turno'
        });
    }
    return Turno;
};