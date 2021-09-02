module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    first_name: { type: Sequelize.STRING},
    last_name: { type: Sequelize.STRING},
    email: { type: Sequelize.STRING},
    password: { type: Sequelize.STRING},
    picture: { type: Sequelize.STRING},
    role: { type: Sequelize.INTEGER},
    token: { type: Sequelize.STRING},
  });

  return User;
};