module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      user_id: { type: Sequelize.INTEGER },
      post_id: { type: Sequelize.INTEGER },
      content: { type: Sequelize.STRING },
    }, {
      timestamps: true
    });
    ("");
    return Comment;
  };
  