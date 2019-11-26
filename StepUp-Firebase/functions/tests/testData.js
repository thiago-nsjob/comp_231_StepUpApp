const BASE_URL = 'https://step-up-app.firebaseapp.com';
const now = Date.now();
const userData = {
    email:      `e${now}@email.com`,
    firstName:  `f${now}`,
    lastName:   `l${now}`,
    dob:        now,
    height:     Math.floor((Math.random() * 100) + 100),
    weight:     Math.floor((Math.random() * 100) + 100)
}

module.exports = {  userData, now, BASE_URL };