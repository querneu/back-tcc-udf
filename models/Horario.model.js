module.exports = (sequelize, DataTypes) => {
    const Horario = sequelize.define("Horario", {
      id_horario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome_horario: {
        type: DataTypes.STRING,
      },
      num_ordem: {
        type: DataTypes.INTEGER,
      },
    });
    return Horario;
  };