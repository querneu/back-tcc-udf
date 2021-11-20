module.exports = (sequelize, DataTypes) => {
    const Turno = sequelize.define("Turno", {
      id_turno: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome_turno: {
        type: DataTypes.STRING,
      },
    });

    Turno.associate = (models) => {
      Turno.hasMany(models.Turma, {
        foreignKey: { name: 'id_turno' }
      })
    }
    return Turno;
  };