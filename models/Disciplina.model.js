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
      },
      cod_tipo_ensino_exclusivo:{
        type:DataTypes.STRING
      },
      is_active:{
        type: DataTypes.STRING,
      }
    });
    
    Disciplina.associate = function (models) {
      Disciplina.hasMany(models.Ensino, {as: 'Ensino'});
  };
    return Disciplina;
  };