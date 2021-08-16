"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  Like.init(
    {
      id: { type: DataTypes.NUMBER, allowNull: false },
      post_id: { type: DataTypes.NUMBER, allowNull: false },
      user_id: { type: DataTypes.NUMBER, allowNull: false },
      like_type: { type: DataTypes.NUMBER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
