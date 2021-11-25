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
    return Fase;
};