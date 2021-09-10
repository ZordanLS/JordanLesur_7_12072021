module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    user_id: { type: Sequelize.INTEGER },
    content: { type: Sequelize.STRING },
  }, {
    timestamps: false
  });
  ("");
  return Post;
};
