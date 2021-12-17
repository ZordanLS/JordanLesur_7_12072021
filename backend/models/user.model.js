module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      firstName: { type: Sequelize.STRING, field: 'first_name' },
      lastName: { type: Sequelize.STRING, field: 'last_name' },
      email: { type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      picture: { type: Sequelize.STRING },
      role: { type: Sequelize.INTEGER },
      token: { type: Sequelize.STRING },
    },
    {
      timestamps: true,
    }
  );

  return User;
};
