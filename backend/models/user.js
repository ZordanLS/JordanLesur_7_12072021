"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      picture: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.NUMBER, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
