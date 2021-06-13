const mongoose = require('mongoose');
let dbURI = 'mongodb+srv://Alwin:SjdVxZaKITMJEHv6@cluster0.d8nhm.mongodb.net/socialMedia?retryWrites=true&w=majority'; 
mongoose.connect(
    dbURI, 
    {
        dbName:'socialMedia', 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
require('./users');

mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`mongoose disconnected through ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodmon restart', () => {
        process.kill(process.pid, 'SIGNUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});