module.exports = (sequelize, DataTypes) => {
    const Turma = sequelize.define("Turma", {
        id_turma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_turma: {
            type: DataTypes.STRING,
        },
        data_inicio: {
            type: DataTypes.STRING,
        },
        data_fim: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.STRING,
        }
    });
    Turma.associate = function(models) {
        // Tutorial.belongsToMany(Tag, {
        //     through: "tutorial_tag",
        //     as: "tags",
        //     foreignKey: "tutorial_id",
        //   });
        Turma.belongsTo(models.Serie, {
            as: "Series",
            targetKey:'id_serie',
            foreignKey : 'fk_serie',
        });
    }
    return Turma;
};