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
        is_active: {
            type: DataTypes.STRING,
        }
    });
    
    Disciplina.associate = function (models) {
        Disciplina.hasMany(models.Materia, {
            sourceKey: 'id_disciplina', 
            foreignKey: 'fk_disciplina'
        }
        )
        Disciplina.hasMany(models.Serie,{
            sourceKey: 'id_serie',
            foreignKey: 'fk_serie'
        })
    }
    return Disciplina;
};