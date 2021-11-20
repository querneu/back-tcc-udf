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
            foreignKey: { name: 'fk_id_tipo_ensino' }
        })
    }
    Turma.associate = (models) => {
        Turma.hasMany(models.Aluno, {
            constraints: false,
            foreignKey: { name: 'id_turma' }
        })
    }

    return Turma;
};