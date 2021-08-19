// Importation des modules d'authentification

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { Op } = require("sequelize");

const token = require("../middleware/token");

// Fonction de création de compte utilisateur

exports.signup = async (req, res) => {
  const user = await db.User.findOne({
    where: { email: req.body.email },
  });
  if (user !== null) {
    return res.status(400).json({ error: "Un compte est déjà associé à cet email" });
  } else {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.User.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: hash,
      picture: "",
      role: 0,
      token: "",
    });
    const tokenObject = await token.issueJWT(newUser);
    res.status(201).send({
      user: newUser,
      token: tokenObject.token,
      expires: tokenObject.expiresIn,
      message: `Bienvenue ${newUser.firstName} !`,
    });
  }
};

// Fonction de connection

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
