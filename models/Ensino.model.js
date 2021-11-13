module.exports = (sequelize, DataTypes) => {
    const Ensino = sequelize.define("Ensino", {
        id_Ensino: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        is_active: {
            type: DataTypes.INTEGER,
        },
        dt_inicio:{
            type: DataTypes.STRING
        },
        dt_fim:{
            type: DataTypes.STRING
        }
    });
    Ensino.associate = (models) => {
        Ensino.belongsTo(models.Professor, {
            foreignKey: {
                name: 'id_professor'
            }
        }),
            
        Ensino.belongsTo(models.Disciplina, {
            foreignKey: {
                name: 'id_disciplina'
            }
        })
    }
    return Ensino;
};