module.exports = (sequelize, DataTypes) => {
    const Ensino = sequelize.define("Ensino", {
        id_Ensino: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        is_active: {
            type: DataTypes.INTEGER,
        }
    });
    Ensino.associate = (models) => {
        Ensino.hasMany(models.Professor, {
            foreignKey: {
                name: 'id_tipo_ensino'
            }
        }),
        Ensino.hasMany(models.Turma, {
            foreignKey: {
                name: 'id_turma'
            }
        })
    }
    return Ensino;
};