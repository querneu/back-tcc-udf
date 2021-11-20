module.exports = (sequelize, DataTypes) => {
    const Turma = sequelize.define("Turma", {
        id_turma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ano_turma: {
            type: DataTypes.INTEGER,
        },
        nome_turma: {
            type: DataTypes.STRING,
        },
        qtd_meses: {
            type: DataTypes.INTEGER,
        },
        tipo_de_calendario: {
            type: DataTypes.STRING,
        },
    });
    Turma.associate = (models) => {
        Turma.hasOne(models.TipoEnsino, {
            foreignKey: { name: 'id_tipo_ensino' }
        })
        Turma.belongsTo(models.Turno, {
            foreignKey: { name: 'id_turno' }
        })
        Turma.hasMany(models.Aluno, {
            foreignKey: { name: 'id_turma' }
        })
        Turma.hasMany(models.Aula, {
            foreignKey: { name: 'id_turma' }
        })
    }

    return Turma;
};