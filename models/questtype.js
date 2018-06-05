'use strict';

module.exports = (sequelize, DataTypes) => {
    var QuestType = sequelize.define('QuestType', {
        name: DataTypes.STRING
    }, {
        timestamps: true
    });

    QuestType.associate = function (models) {
        this.Quests = this.hasMany(models.Quest, { foreignKey: 'typeId', sourceKey: 'id' });
    };

    return QuestType;
};