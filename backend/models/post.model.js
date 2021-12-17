module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      userId: { type: Sequelize.INTEGER, field: 'user_id' },
      content: { type: Sequelize.STRING },
      picture: { type: Sequelize.STRING },
    },
    {
      timestamps: true,
    }
  );
  ("");
  return Post;
};
