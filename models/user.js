'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Phone number invalid."
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                len: {
                    args: [7, 20],
                    msg: "Phone number invalid, too short."
                },
                isNumeric: {
                    msg: "not a valid phone number."
                }
            }
        },
        password: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fbId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fbToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fbName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fbEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true
    });

    Model.associate = function (models) {
        this.Quests = this.hasMany(models.Quest, {foreignKey: 'ownerId', sourceKey: 'id'});
        this.Roles = this.belongsToMany(models.Role, { 
            as: 'Roles',
            through: 'user_has_roles',
            foreignKey: 'userId',
            otherKey: 'roleId'
        });
    };

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if (!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) TE(err);

        if (!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " + jwt.sign({
            user_id: this.id
        }, CONFIG.jwt_encryption, {
            expiresIn: expiration_time
        });
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        delete json.password;
        return json;
    };

    return Model;
};