'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
                type: Sequelize.STRING,
                unique: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            fbId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            fbToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            fbName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            fbEmail: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            googleId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            googleToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            googleName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            googleEmail: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};