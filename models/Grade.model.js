module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define("Grade", {
        id_grade: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });
    Grade.associate = function(models) {
        Grade.belongsTo(models.Aula, {
            as: 'Aulas',
            targetKey:'id_aula',
            foreignKey : 'fk_aula',
        });
        
        Grade.belongsTo(models.Horario, {
            as: 'Horarios',
            targetKey:'id_horario',
            foreignKey : 'fk_horario',
        });
        Grade.belongsTo(models.Turma, {
            as: 'Turmas',
            targetKey:'id_turma',
            foreignKey : 'fk_turma',
        });
    }
    return Grade;
};