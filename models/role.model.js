const mongoose = require('mongoose');

/*Role Schema*/
const roleSchema = new mongoose.Schema({
    name: String,
});

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../config/db.users');
const Role = dbConnection.model('Role', roleSchema, 'role');

// export the model
module.exports.model = Role;
