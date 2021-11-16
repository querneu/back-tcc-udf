module.exports = (sequelize, DataTypes) => {
    const Ensino = sequelize.define("Ensino", {
      id_ensino: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_professor:{
          type: DataTypes.STRING,
      },
      id_disciplina:{
          type: DataTypes.STRING,
      },
      dt_inicio: {
          type: DataTypes.STRING,
      },
      dt_fim:{
          type: DataTypes.STRING
      }
    });
    return Ensino;
  };