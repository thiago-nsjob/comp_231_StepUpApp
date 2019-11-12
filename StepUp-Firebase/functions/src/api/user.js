const express = require('express');
const lo = require('lodash');
const db = require('../base/db');
// const { hashString } = require('../helpers/hash');

const route = express.Router();
const userProfile = db.collection('UserProfile');

const profileData = ['email', 'firstName', 'lastName', 'dob', 'weight', 'height'];


// REMOVE
route.get([
    '/get/:id',
    '/:id'
], (req, res, next) => {
    let id = req.params.id;
    if (!id || id.length < 5) {
        return next(new Error(`Cannot get ${req.path}`));
    }
    let user = userProfile.doc(id);
    user.get().then(snapshot => {
        res.json({
            data: snapshot.data()
        });
    }).catch(next);
});



// similar to "/user/:id", may remove one in the future (?)
route.get('/getByEmail', (req, res, next) => {

    // use lo.get(req, 'body.email');
    let email = req.query.email || req.body.email;

    if (!email || !/^\w+\.?\w*@\w+\.\w+$/.test(email)) {
        return next(new Error(`Not an email!`));
    }

    let user = userProfile.doc(email);

    user.get().then(snapshot => {
        res.json({
            data: snapshot.data()
        });
    }).catch(next);

});



route.post('/create', (req, res, next) => {

    let id, profile = {};

    profileData.forEach(field => {
        profile[field] = lo.get(req, `body.${field}`, '');
    });

    if (!/^\w+\.?\w*@\w+\.\w+$/.test(profile.email)) {
        return next(new Error('Cannot create a user without an email'));
    } else {
        id = profile.email;
        delete profile.email;
    }

    let ref = userProfile.doc(id);

    ref.set(profile).then(() => {
        profile.email = profile.id = id;
        
        res.json({
            msg: `Created new user under ${id}`,
            data: profile
        });

    }).catch(next);

});



route.put('/update', (req, res, next) => {

    let data = req.body;
    let email = req.query.email || req.body.email;

    if (!email || !/^\w+\.?\w*@\w+\.\w+$/.test(email)) {
        return next(new Error('Not an id!'));
    }

    let ref = userProfile.doc(email);

    ref.set(data || {}, {
        merge: true
    }).then(() => {
        res.json({ msg: 'Successfully updated', data }) // TEMP
    }).catch(next);

});


module.exports = route;
