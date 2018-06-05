'use strict';

const User = require('../models/user');
const QuestType = require('../models/questtype');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Quests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            best: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            accepted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            minPlayers: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            maxPlayers: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            minAge: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            complexity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            raiting: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            latitude: {
                type: Sequelize.FLOAT(11, 8),
                allowNull: true,
                defaultValue: null,
            },
            longitude: {
                type: Sequelize.FLOAT(11, 8),
                allowNull: true,
                defaultValue: null,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            subway: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            howToFind: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'en'
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
        return queryInterface.dropTable('Quests');
    }
};
