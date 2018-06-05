'use strict';
module.exports = (sequelize, DataTypes) => {
    var ComfortType = sequelize.define('ComfortType', {
        name: DataTypes.STRING
    }, {
        timestamps: true
    });

    ComfortType.associate = function (models) {
        this.Quests = this.belongsToMany(models.Quest, {
            through: 'QuestComfortType'
        });
    };

    return ComfortType;
};