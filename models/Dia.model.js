module.exports = (sequelize, DataTypes) => {
    const Dia = sequelize.define("Dia", {
        id_Dia: {
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
    return Dia;
};