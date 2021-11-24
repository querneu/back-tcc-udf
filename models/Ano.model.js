module.exports = (sequelize, DataTypes) => {
    const Ano = sequelize.define("Ano", {
        id_Ano: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_Ano: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    return Ano;
};