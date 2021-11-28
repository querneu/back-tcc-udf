module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define("Aluno", {
        id_aluno: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_aluno: {
            type: DataTypes.STRING,
        },
        dat_nascimento: {
            type: DataTypes.INTEGER,
        },
        cod_sexo: {
            type: DataTypes.STRING,
        },
        matricula: {
            type: DataTypes.STRING,
        },
        email_aluno: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Aluno.associate = function (models) {
        Aluno.belongsToMany(models.Turma, {
            as: 'Alunos',
            through: { model: models.Aluno_Turma, unique: false },
            foreignKey: 'fk_aluno'
        });
    }
    return Aluno;
};