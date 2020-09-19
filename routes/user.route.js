const express = require('express');
const router = express.Router();

/*Import des controllers*/
const controller = require("../controllers/user.controller");

/* import middleswars */
const { auth } = require('../middlewares');

/*Route for user by Admin*/
router.get('/', [ auth.verifyToken, auth.isAdmin ], controller.getUsers);

/*Route for Admin only*/
router.put('/roles/:id/moderator', [ auth.verifyToken, auth.isAdmin ], controller.giveModeratorRole);
router.delete('/roles/:id/moderator', [ auth.verifyToken, auth.isAdmin ], controller.removeModeratorRole);

module.exports = router;
