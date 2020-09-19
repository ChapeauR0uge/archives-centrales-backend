const db = require('../models')

const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (user) {
      res.status(400).json({ message: "Echec! Le pseudo est déjà prit!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (user) {
        res.status(400).json({ message: "Echec! L'email existe déjà!" });
        return;
      }

      next();
    });
  });
};

module.exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
