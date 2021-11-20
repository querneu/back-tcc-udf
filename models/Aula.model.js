module.exports = (sequelize, DataTypes) => {
    const Aula = sequelize.define("Aula", {
        id_aula: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        qtd_aula_semana: {
            type: DataTypes.STRING,
        },
        is_disciplina_dupla: {
            type: DataTypes.STRING,
        },
        data_inicio_aula: {
            type: DataTypes.STRING,
        },
        data_fim_aula: {
            type: DataTypes.STRING,
        },
    });
    Aula.associate = (models) => {
        Aula.belongsTo(models.Turma, {
            foreignKey: { name: 'id_turma' }
        })
    }
    Aula.associate = (models) => {
        Aula.belongsTo(models.Disciplina, {
            foreignKey: { name: 'id_disciplina' }
        })
    }
    Aula.associate = (models) => {
        Aula.belongsTo(models.Professor, {
            foreignKey: { name: 'id_professor' }
        })
    }

    return Aula;
};