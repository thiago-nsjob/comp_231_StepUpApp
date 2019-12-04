const middleware = require('../helpers/middleware');
const { attachCommon, attachErrorHandlers } = middleware;
const extractEmail = middleware.extractEmail();

const lo = require('lodash');
const db = require('../base/db');
const userProfile = db.collection('UserProfile');

const express = require('express');
const route = attachCommon( express() );

const profileData = [/*'email',*/ 'firstName', 'lastName', 'dob', 'weight', 'height'];

// define the home page route
route.get('/', (_, res) => {
    res.send('User page');
});

// get by email
route.get('/getByEmail', extractEmail, (req, res, next) => {

    let user = userProfile.doc(req.email);

    user.get().then(snapshot => {
        res.json({
            data: snapshot.data()
        });
    }).catch(next);
});

//get by id
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

route.post('/create', extractEmail, (req, res, next) => {

    let email = req.email, profile = {};

    profileData.forEach(field => {
        profile[field] = lo.get(req, `body.${field}`, '');
    });

    let ref = userProfile.doc(email);

    ref.set(profile).then(() => {
        profile.email = profile.id = email;
        res.json({
            msg: `Created new user under ${email}`,
            data: profile
        });

    }).catch(next);

});


//update
route.put('/update', extractEmail, (req, res, next) => {

    let data = req.body || {};
    let ref = userProfile.doc(req.email);

    ref.set(data, { merge: true }).then(() => {
        res.json({ msg: 'Successfully updated', data }) // TEMP
    }).catch(next);

});


module.exports = attachErrorHandlers( route );
