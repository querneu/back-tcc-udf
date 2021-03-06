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
        data_nascimento: {
            type: DataTypes.DATE,
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
            as: 'Turmas',
            through: { model: models.Aluno_Turma, unique: false },
            foreignKey: 'fk_aluno'
        });
    }
    return Aluno;
};