const express = require('express');
const lo = require('lodash');
const db = require('../base/db');

const userProfile = db.collection('UserProfile');

const route = express.Router();


// const stepsModel = {
//     steps: Number,
//     timestamp: Number
// };

route.post('/log', (req, res, next) => {

    let email = req.query.email || req.query.id || req.body.email;

    let steps = lo.get(req, 'body.steps', 1),
    timestamp = lo.get(req, 'body.timestamp', Date.now());


    if (!email || !/^\w+\.?\w*@\w+\.\w+$/.test(email)) {
        return next(new Error('Not an email!'));
    } else if (isNaN(steps) || Number(steps) <= 0 ) {
        return next(new Error('Steps should be a number > 0.'));
    } else {
        steps = Number(steps);
    }

    let data = { steps, timestamp };

    let stepsTaken = userProfile.doc(email).collection('StepsTaken');

    stepsTaken.add(data).then(() => {
        res.send({ msg: 'Added amount of steps', data });
    }).catch(next);

});


route.get('/total', (req, res, next) => {

    let email = req.query.email || req.query.id || req.body.email;

    if (!email || !/^\w+\.?\w*@\w+\.\w+$/.test(email)) {
        return next(new Error('Not an email!'));
    }

    let collection = userProfile.doc(email).collection('StepsTaken');

    collection.get().then(snap => {

        let total = 0;

        snap.forEach(res => {
            total += res.data().steps || 0;
        });

        res.json({
            msg: `total steps for ${email}`,
            data: total
        });
    });

});



module.exports = route;
