const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model').model;
db.role = require('./role.model').model;
db.departement = require('./departement.model').model;
db.service = require('./service.model').model;

db.ROLES = ['user', 'moderator', 'admin'];

module.exports = db;
