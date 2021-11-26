module.exports = (sequelize, DataTypes) => {
    const Disciplina = sequelize.define("Disciplina", {
        id_disciplina: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_disciplina: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    return Disciplina;
};