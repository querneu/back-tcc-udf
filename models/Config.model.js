module.exports = (sequelize, DataTypes) => {
    const Config = sequelize.define("Config", {
        id_config: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        qtd_max_aulas: {
            type: DataTypes.STRING,
        },
        exibir_percentual: {
            type: DataTypes.STRING,
        },
        per_dois_professores: {
            type: DataTypes.STRING,
        },
        per_carga_hor_superior: {
            type: DataTypes.STRING,
        },
        desativar_turmas_janeiro: {
            type: DataTypes.STRING,
        },
        desativar_turma_jul: {
            type: DataTypes.STRING,
        }
    });
    return Config;
};