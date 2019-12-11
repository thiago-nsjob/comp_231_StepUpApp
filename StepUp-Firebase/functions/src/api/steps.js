const lo = require('lodash');
const {
    extractEmail,
    attachCommon,
    attachErrorHandlers
} = require('../helpers/middleware');

const db = require('../base/db');
const userProfile = db.collection('UserProfile');

const express = require('express');
const route = attachCommon( express() );


route.use(
    extractEmail({ raiseError: true })
);


route.post('/log', async (req, res, next) => {

    let data = {
        steps: lo.get(req, 'body.steps', 1),
        timestamp: lo.get(req, 'body.timestamp', Date.now())
    };

    if (isNaN(data.steps) || lo.toNumber(data.steps) <= 0) {
        return next(new Error('Steps should be a number > 0.'));
    } else {
        data.steps = Number(data.steps);
    }

    let userRef = userProfile.doc(req.email);
    let stepsTaken = userRef.collection('StepsTaken');
    let userSnap = await userRef.get().catch(next);
    
    let joinedChallenges = userRef.collection('JoinedChallenges');


    let updatePromise = joinedChallenges.get().then(snap => {

        let updatedChallenges = [],
        height = userSnap.data().height; // cm

        // Unit is in 'cm' based on height
        let disCM = height * data.steps * .43;

        // Convert disCM to 'm'
        let disM = disCM * .01;

        snap.docs.forEach(doc => {
            let ch = doc.data(); // 'ch' short for challenge

            if (!ch.achieved) {
                ch.progress += disM;
                if (ch.progress >= ch.distance) {
                    ch.progress = ch.distance;
                    ch.achieved = true;
                }
                doc.ref.set(lo.pick(ch, ['progress', 'achieved']), { merge: true });
                ch.id = doc.id;
                ch.unit = 'meters';
                updatedChallenges.push(ch);
            }
        });

        return updatedChallenges;
    });



    Promise.all([
        stepsTaken.add(data),
        updatePromise
    ]).then(([_, updatedChallenges]) => {
        res.send({ added: data, updatedChallenges });
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

    let total = {
        steps: 0,
        distance: 0 // m
    };

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
            let disCM = height * data.steps * .43;

            // Convert disCM to 'm'
            data.distance = disCM * .01;
            data.unit = 'meters';
            
            total.steps += data.steps;
            total.distance += data.distance;

            steps.push(data);
        });


        res.json({ total, steps });

    }).catch(next);

});



module.exports = attachErrorHandlers( route );
