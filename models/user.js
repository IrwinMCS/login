const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'info', // Nome da tabela no banco de dados
    timestamps: false
});

module.exports = User;
