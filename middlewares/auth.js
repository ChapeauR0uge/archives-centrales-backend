const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

/*Import des modeles*/
const db = require('../models');

const User = db.user;
const Role = db.role;


const verifyToken = (req, res, next) => {
    /*On récupère le header*/
    let { headers } = req;

    /*On vérifie que le header authorization est présent*/
    if (!headers || !headers.authorization ) {
        return res.status(401).json({ message: "Header authorization manquant !"});
    }

    /*On vérifie la présence d'un token*/
    let [bearer, token] = headers.authorization.split(' ');

    if ( !bearer || bearer.toLowerCase() !== 'bearer') {
        return res.status(401).json({ message: "Header format est Authorization: Bearer <token>"})
    }

    if (!token) {
        return res.status(403).json({ message: "Pas de token fourni!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            Role.find(
                 {
                   _id: { $in: user.roles }
                 },
                 (err, roles) => {
                   if (err) {
                     res.status(500).send({ message: err });
                     return;
                   }

                   for (let i = 0; i < roles.length; i++) {
                     if (roles[i].name === "admin") {
                       next();
                       return;
                     }
                   }

                   res.status(403).send({ message: "Requière l'autorisation d'Administration" });
                   return;
               }
           );
       });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Requière l'autorisation de modération" });
        return;
      }
    );
  });
};

const isNotModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
              res.status(403).send({ message: "L'utilisateur est déjà modérateur !" });
            return;
          }
        }

        next();
        return;
      }
    );
  });
};

module.exports.isAdmin = isAdmin;
module.exports.isModerator = isModerator;
module.exports.isNotModerator = isNotModerator;
module.exports.verifyToken = verifyToken;
