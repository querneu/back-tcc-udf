module.exports = (sequelize, DataTypes) => {
    const Ensino = sequelize.define("Ensino", {
        id_Ensino: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        is_active:{
            type:DataTypes.INTEGER,
        }
    });
    Ensino.associate = (models) => {
        Ensino.hasMany(models.Professor),
        Ensino.hasMany(models.Disciplina)
    }
    return Ensino;
};