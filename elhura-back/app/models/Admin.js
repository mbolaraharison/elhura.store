/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Admin', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idAddress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'idAddress'
      }
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Role',
        key: 'idRole'
      }
    },
    username: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    birthPlace: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    isValid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    validationCode: {
      type: DataTypes.STRING(6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Admin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "FK_adminAddress",
        using: "BTREE",
        fields: [
          { name: "idAddress" },
        ]
      },
      {
        name: "FK_userRole",
        using: "BTREE",
        fields: [
          { name: "idRole" },
        ]
      },
    ]
  });
};
