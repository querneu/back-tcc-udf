module.exports = (sequelize, DataTypes) => {
  const TipoEnsino = sequelize.define("TipoEnsino", {
    id_tipo_ensino: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome_tipo_ensino: {
      type: DataTypes.STRING,
    },
  });

  TipoEnsino.associate = models => {
    TipoEnsino.hasMany(models.Turma,
      { foreignKey: {name: 'id_turma'}, constraints: false }
    );

  }
  return TipoEnsino;
};