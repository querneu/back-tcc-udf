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
      { foreignKey: 'id_turma', constraints: false }
    );
    //TipoEnsino.hasMany(models.Turma,{ as: 'fk_Turma', constraints: false , foreignKey: 'id_turma'});
  }
  return TipoEnsino;
};