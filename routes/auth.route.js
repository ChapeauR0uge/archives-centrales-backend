const express = require('express');
const router = express.Router();

/*Import des controllers*/
const controller = require("../controllers/auth.controller");

/*Import des middleswars*/
const { verifySignUp } = require('../middlewares');

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);

router.post('/signin', controller.signin);

module.exports = router;
