const express = require('express');
const db = require('../base/db');
const { extractEmail } = require('../helpers/middleware');

const challenges = db.collection('Challenges');
const userProfile = db.collection('UserProfile');
const route = express.Router();

const challengeModel = ['title', 'active', 'description', 'distance', 'reward'];




route.get('/available', (_, res) => {
    let query = challenges.where('active', '==', true);

    let available = [];

    query.get().then(snap => {
        snap.docs.forEach(doc => {
            let data = doc.data();
            data.id = doc.id;
            available.push(data);
        });

        res.json(available);
    });
});



route.put('/join/:id', extractEmail(), async (req, res, next) => {
    
    let email = req.email, id = req.params.id;
    let userRef = userProfile.doc(email);
    let joined = userRef.collection('JoinedChallenges');
    
    let challengeRef = challenges.doc(id);
    
    let snap = await challengeRef.get().catch(next);

    if (!snap.exists) {
        return next(new Error(`Challenge ${id} doesn't exist.`));
    }


    let data = snap.data();

    joined.doc(id).set(data).then(() => {
        res.json({
            msg: `${email} joined ${id}`,
            data: {
                distance: data.distance,
                progress: 0
            }
        });
    });

});


route.get([
    '/get/:id',
    '/:id'
], (req, res) => {

    let id = req.params.id;

    let ref = challenges.doc(id);

    ref.get().then(snap => {
        res.json(snap.data() || {});
    });

});





module.exports = route;
