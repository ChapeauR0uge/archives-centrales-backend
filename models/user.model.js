const mongoose = require('mongoose');

/*User Schema*/
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    dep_right: {
        type: Array,
    },
    roles :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        }
    ]
},{
    timestamps: true,
});

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../config/db.users');
const User = dbConnection.model('User', userSchema, 'user');

// export the model
module.exports.model = User;
