const mongoose = require('mongoose');

mongoose.Promise = global.Promise;     // on remplace les promesses de moongoose

// URI of the database
const dbURI = "mongodb+srv://dbarlet:wsedcvgyhn@archivescentrales-6rnhh.gcp.mongodb.net/dbusers?retryWrites=true&w=majority";

// connect to database
const dbUsers= mongoose.createConnection(dbURI,
                                               { useNewUrlParser: true,
                                                 useUnifiedTopology : true,
                                                 useCreateIndex: true} );

// export connection
module.exports = dbUsers;

dbUsers.on('connected',
  () => console.log('db.js : connected to database dbUsers')
);
dbUsers.on('disconnected',
  () => console.log('db.js : disconnected from database dbUsers')
);
dbUsers.on('error',
  err => console.log('connection error dbUsers'+ err)
);

//
// "clean"  management of connection end
//
const shutdown = function(msg, callback) {
  dbUsers.close(() => {
      console.log(' Mongoose shutdown : '+msg);
      callback();
    }
  );
}


// application killed (ctrl+c)
process.on('SIGINT', () => shutdown('application ends', () => process.exit(0)) );
// for nodemon
process.once('SIGUSR2', () => shutdown('nodemon restarting', () => process.kill(process.pid, 'SIGUSR2')) );
// process killed (POSIX)
process.on('SIGTERM', () =>  shutdown('SIGTERM received', () => process.exit(0)) );
