module.exports = (sequelize, DataTypes) => {
    const Aluno_Turma = sequelize.define("Aluno_Turma", {
        id_aluno_turma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data_matricula: {
            type: DataTypes.INTEGER,
        }
    });
    return Aluno_Turma;
};