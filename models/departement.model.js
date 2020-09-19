const mongoose = require('mongoose');

/*departement schema */
const depSchema = new mongoose.Schema({
    dep_id : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    homePage : {
        type : String,
        required : true
    },
    services : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
},{
    timestamps: true,
});

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../config/db.archive');
const Departement = dbConnection.model('Departement', depSchema, 'departement');

// export the model
module.exports.model = Departement;
