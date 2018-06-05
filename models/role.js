'use strict';
module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('Role', {
        name: DataTypes.STRING
    }, {});
    Role.associate = function(models) {
        // associations can be defined here
        this.Permissions = this.belongsToMany(models.Permission, { 
            as: 'Permissions',
            through: 'role_has_permissions',
            foreignKey: 'roleId',
            otherKey: 'permissionId'
        });
        this.Users = this.belongsToMany(models.User, { 
            as: 'Users',
            through: 'user_has_roles',
            foreignKey: 'roleId',
            otherKey: 'userId'
        });
    };
    return Role;
};