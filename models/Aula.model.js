module.exports = (sequelize, DataTypes) => {
    const Aula = sequelize.define("Aula", {
        id_Aula: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_Aula: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Aula.associate = function(models) {
        Aula.belongsTo(models.Professor, {
            targetKey:'id_professor',
            foreignKey : 'fk_professor',
        });
        Aula.belongsTo(models.Materia, {
            targetKey:'id_materia',
            foreignKey : 'fk_materia',
        });
    }
    return Aula;
};