const mongoose = require('mongoose');

mongoose.Promise = global.Promise;     // on remplace les promesses de moongoose

// URI of the database
const dbURI = "mongodb+srv://dbarlet:wsedcvgyhn@archivescentrales-6rnhh.gcp.mongodb.net/dbarchive?retryWrites=true&w=majority";

// connect to database
const dbArchive = mongoose.createConnection(dbURI,
                                               { useNewUrlParser: true,
                                                 useUnifiedTopology : true,
                                                 useCreateIndex: true} );

// export connection
module.exports = dbArchive;

dbArchive.on('connected',
  () => console.log('db.js : connected to database dbArchive')
);
dbArchive.on('disconnected',
  () => console.log('db.js : disconnected from database dbArchive')
);
dbArchive.on('error',
  err => console.log('connection error dbArchive'+ err)
);

//
// "clean"  management of connection end
//
const shutdown = function(msg, callback) {
  dbArchive.close(() => {
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
