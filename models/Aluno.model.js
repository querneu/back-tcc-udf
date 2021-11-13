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
        type: DataTypes.STRING,
      },
      sexo: {
        type: DataTypes.STRING,
      },
      matricula: {
        type: DataTypes.STRING,
      },
      telefone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      is_active:{
        type:DataTypes.STRING
      }
    });
    return Aluno;
  };