module.exports = (sequelize, DataTypes) => {
    const Aula = sequelize.define("Aula", {
        id_aula: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_aula: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Aula.associate = function(models) {
        Aula.hasMany(models.Grade,{
            targetKey: 'id_aula',
            foreignKey: 'fk_aula',
        });
        Aula.belongsTo(models.Professor, {
            as: 'Professores',
            targetKey:'id_professor',
            foreignKey : 'fk_professor',
        });
        Aula.belongsTo(models.Materia, {
            as: 'Materias',
            targetKey:'id_materia',
            foreignKey : 'fk_materia',
        });
    }
    return Aula;
};