const functions = require('firebase-functions')

const express = require('express');
const app = express();

const userRoutes = require('./src/api/user');
const stepsRoutes = require('./src/api/steps');
const challengesRoutes = require('./src/api/challenges');
const rewardsRoutes = require('./src/api/rewards');

const db = require('./src/base/db');
const middleware = require('./src/helpers/middleware');


middleware.attachCommon( app );

// Sets up routes
app.use('/user', userRoutes);

app.use('/steps', stepsRoutes);

app.use('/challenges', challengesRoutes);

app.use('/rewards',rewardsRoutes);


// Appends Error Handler

app.use(
    middleware.pageNotFoundHandler,
    middleware.internalErrorHandler
);


exports.app = functions.https.onRequest( app ); 
