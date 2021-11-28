module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professor", {
        id_professor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_professor: {
            type: DataTypes.STRING,
        },
        qtd_horas_trabalho: {
            type: DataTypes.INTEGER,
        },
        email_professor: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Professor.associate = function (models) {
        Professor.hasMany(models.Aula, {
            sourceKey: 'id_professor',
            foreignKey: 'fk_professor' 
        });
    }
    return Professor;
};