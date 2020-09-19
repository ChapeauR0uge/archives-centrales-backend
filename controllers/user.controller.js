/*Import du model*/
const db = require('../models');
const User = db.user;
const Role = db.role;

/* PUT /:id */
const giveModeratorRole =
    async (req, res) => {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({ message: "L'Utilisateur n'existe pas !"});
        }

        Role.findOne({ name: "moderator" },
            (err, role) => {
                if(err){
                    return res.status(500).json({ message: err });
                }
                user.roles.push(role._id);
                user.save(err => {
                  if (err) {
                    return res.status(500).json({ message: err });
                  }
                  return res.status(200).json({ message: "Mise à jour avec succès"});
              });
        });
    };

/* Supprime le rôle moderateur d'un utilisateur
* DELETE /:id
*/
const removeModeratorRole =
    async (req, res) => {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({ message: "L'Utilisateur n'existe pas !"});
        }

        Role.findOne({ name: "moderator" },
            (err, role) => {
                if(err){
                    return res.status(500).json({ message: err });
                }
                /*Suppression du role moderateur de l'utilisateur*/
                let index = user.roles.indexOf(role._id);
                user.roles.splice(index, 1);

                user.save(err => {
                  if (err) {
                    return res.status(500).json({ message: err });
                  }
                  return res.status(200).json({ message: "Mise à jour avec succès"});
              });
        });
    }
/*Récupère la liste de tout les utilisateurs
* GET /
*/
const getUsers =
    (req, res) =>
        User.find()
            .populate({path: "roles", select:"name -_id"})
            .select({ username: 1, email: 1, roles: 1 })
            .then( (service) => res.status(200).json(service) );

module.exports.getUsers = getUsers;
module.exports.giveModeratorRole = giveModeratorRole;
module.exports.removeModeratorRole = removeModeratorRole;
