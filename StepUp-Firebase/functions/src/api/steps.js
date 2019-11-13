const express = require('express');
const lo = require('lodash');
const db = require('../base/db');
const { extractEmail } = require('../helpers/middleware');

const userProfile = db.collection('UserProfile');

const route = express.Router();


// const stepsModel = {
//     steps: Number,
//     timestamp: Number
// };

route.use(
    extractEmail({ raiseError: true })
);


route.post('/log', (req, res, next) => {

    let email = req.email;

    let steps = lo.get(req, 'body.steps', 1),
    timestamp = lo.get(req, 'body.timestamp', Date.now());

    
    if (isNaN(steps) || Number(steps) <= 0 ) {
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


route.get('/total', (req, res) => {

    let email = req.email;

    let stepsTaken = userProfile.doc(email).collection('StepsTaken');

    stepsTaken.get().then(snap => {

        let total = 0;

        snap.forEach(result => {
            total += result.data().steps || 0;
        });

        res.json({
            msg: `total steps for ${email}`,
            data: total
        });
    }).catch(err => {
        throw err ? err : new Error('An error occured while getting total.');
    });

});

route.get('/distance', (req, res, next) => {
    let email = req.email;

    let total = { steps: 0, distance: 0 };
    let steps = [];

    let userRef = userProfile.doc(email);
    let stepsRef = userRef.collection('StepsTaken');

    Promise.all([
        userRef.get(),
        stepsRef.get()
    ]).then(([ userSnap, stepsSnap ]) => {
        let user = userSnap.data();
        
        let height = lo.toNumber(lo.get(user, 'height', 159));

        if (!height) {
            height = 159;
        }

        stepsSnap.forEach(result => {
            let data = result.data();
            data.id = result.id;

            data.steps = data.steps || 0;
            data.distance = height * data.steps * .43;
            
            total.steps += data.steps;
            total.distance += data.distance;

            steps.push(data);
        });


        res.json({ total, steps });

    }).catch(next);

});



module.exports = route;
