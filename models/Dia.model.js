module.exports = (sequelize, DataTypes) => {
    const Dia = sequelize.define("Dia", {
        id_dia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_dia: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Dia.associate = function (models) {
        Dia.hasMany(models.Horario, {
            sourceKey: 'id_dia', 
            as :"Dia",
            foreignKey: 'fk_dia'
        });
    }
    
    return Dia;
};