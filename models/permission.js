'use strict';
module.exports = (sequelize, DataTypes) => {
    var Permission = sequelize.define('Permission', {
        name: DataTypes.STRING
    }, {});
    Permission.associate = function (models) {
        this.Roles = this.belongsToMany(models.Role, { 
            as: 'Roles',
            through: 'role_has_permissions',
            foreignKey: 'permissionId',
            otherKey: 'roleId'
        });
    };
    return Permission;
};