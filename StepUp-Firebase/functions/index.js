const functions = require('firebase-functions')

const express = require('express');
const app = express();

const userRoutes = require('./src/api/user');
const stepsRoutes = require('./src/api/steps');
const challengesRoutes = require('./src/api/challenges');

const db = require('./src/base/db');
const middleware = require('./src/helpers/middleware');


//const usersRef = db.collection("UserProfile");


middleware.attachCommon( app );

// Sets up routes

app.use('/user', userRoutes);

app.use('/steps', stepsRoutes);

app.use('/challenges', challengesRoutes);


// Appends Error Handler

app.use(
    middleware.pageNotFoundHandler,
    middleware.internalErrorHandler
);


exports.app = functions.https.onRequest( app ); 
