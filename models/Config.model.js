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
        mon_exibir_per: {
            type: DataTypes.STRING,
        },
        per_eois_professores: {
            type: DataTypes.STRING,
        },
        per_carga_hor_superior: {
            type: DataTypes.STRING,
        }
    });
    return Config;
};