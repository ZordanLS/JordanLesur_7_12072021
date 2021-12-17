module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      userId: { type: Sequelize.INTEGER,field: 'user_id' },
      postId: { type: Sequelize.INTEGER, field: 'post_id' },
      content: { type: Sequelize.STRING },
    },
    {
      timestamps: true,
    }
  );
  ("");
  return Comment;
};
