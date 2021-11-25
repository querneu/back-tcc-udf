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
    is_active:{
      type: DataTypes.STRING,
    }
  });

  // Disciplina.associate = function (models) {
  //   Disciplina.belongsToMany(models.Professor,
  //     {
  //       through: { model: models.Ensino, unique: false },
  //       as: 'Professores',
  //       foreignKey: 'id_disciplina'
  //     }
  //   );
  //   Disciplina.hasMany(models.Aula,
  //     {
  //       foreignKey: 'id_disciplina',
  //     });
  // }
  return Disciplina;
};