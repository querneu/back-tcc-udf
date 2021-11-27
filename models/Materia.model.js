
module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define("Materia", {
        id_materia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_materia: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Materia.associate = function(models) {
        Materia.belongsTo(models.Disciplina, {
            targetKey:'id_disciplina',
            foreignKey : 'fk_disciplina',
        });
        Materia.belongsTo(models.Serie, {
            targetKey:'id_serie',
            foreignKey : 'fk_serie',
        });
    }
    return Materia;
};