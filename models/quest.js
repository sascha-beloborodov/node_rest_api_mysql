'use strict';

module.exports = (sequelize, DataTypes) => {
    var Quest = sequelize.define('Quest', {
        name: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        best: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        minPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 1, max: 100 }
        },
        maxPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 1, max: 100 }
        },
        minAge: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 1, max: 100 }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 1, max: 60000 }
        },
        complexity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 }
        },
        raiting: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.FLOAT(11, 8),
            allowNull: true,
            defaultValue: null,
            validate: { min: -90, max: 90 }
        },
        longitude: {
            type: DataTypes.FLOAT(11, 8),
            allowNull: true,
            defaultValue: null,
            validate: { min: -180, max: 180 }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subway: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        howToFind: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'en'
        }
    }, {
        timestamps: true,
        validate: {
            bothCoordsOrNone() {
                if ((this.latitude === null) !== (this.longitude === null)) {
                    throw new Error('Require either both latitude and longitude or neither');
                }
            }
        }
    });

    Quest.associate = function (models) {
        this.Type = this.belongsTo(models.QuestType, { foreignKey: 'typeId', targetKey: 'id' });
        this.Owner = this.belongsTo(models.User, { foreignKey: 'ownerId', targetKey: 'id' });
        this.ComfortTypes = this.belongsToMany(models.ComfortType, {
            through: 'QuestComfortType'
        });
    };

    Quest.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        delete json.ownerId;
        return json;
    };

    return Quest;
};