module.exports = (sequelize, DataTypes) => {
    const Disciplina = sequelize.define("Disciplina", {
      id_disciplina: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome_disciplina: {
        type: DataTypes.STRING,
      },
      aula_exclusiva: {
        type: DataTypes.STRING,
      },
      qtd_carga_horaria: {
        type: DataTypes.STRING,
      },
      qtd_aulas: {
        type: DataTypes.STRING,
      }
    });
    return Disciplina;
  };