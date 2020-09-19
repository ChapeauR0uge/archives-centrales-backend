const mongoose = require('mongoose');

/*service schema */
const serviceSchema = new mongoose.Schema({
    dep_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Departement',
        required : true
    },
    service_name : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    }
},{
    timestamps: true,
});

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../config/db.archive');
const Service = dbConnection.model('Service', serviceSchema, 'service');

module.exports.model = Service;
