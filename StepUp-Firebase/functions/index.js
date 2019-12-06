const { https: { onRequest } } = require('firebase-functions');

const userRoutes = require('./src/api/user');
const stepsRoutes = require('./src/api/steps');
const challengesRoutes = require('./src/api/challenges');
const rewardsRoutes = require('./src/api/rewards');

// Parent routes defined in 'firebase.json'
module.exports = {
    user: onRequest( userRoutes ),
    steps: onRequest( stepsRoutes ),
    challenges: onRequest( challengesRoutes ),
    rewards: onRequest( rewardsRoutes ),
};
