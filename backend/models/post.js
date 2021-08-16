"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  Post.init(
    {
      id: { type: DataTypes.NUMBER, allowNull: false },
      user_id: { type: DataTypes.NUMBER, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      postdate: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
