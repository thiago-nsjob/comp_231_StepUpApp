const express = require('express');
const lo = require('lodash');
const db = require('../base/db');
// const { hashString } = require('../helpers/hash');

const route = express.Router();
const userProfile = db.collection('UserProfile');

const profileData = ['email', 'firstName', 'lastName', 'dob', 'weight', 'height'];

// define the home page route
route.get('/', function (req, res) {
    res.send('User page')
  })

  //get by email
route.get('/getByEmail', function(req, res,next) {
    let email = req.query.email || req.body.email;
  
    let user = userProfile.doc(email);

    if (!email || !/^\w+\.?\w*@\w+\.\w+$/.test(email)) {
        return next(new Error(`Not an email!`));
    }

    

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


//update
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
