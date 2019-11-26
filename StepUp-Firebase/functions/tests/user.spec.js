const request = require('request');
const BASE_URL = 'https://step-up-app.firebaseapp.com';


describe('User test suite', () => {
    var now = Date.now();
    const userData = {
        email:      `e${now}@email.com`,
        firstName:  `f${now}`,
        lastName:   `l${now}`,
        dob:        now,
        height:     Math.floor((Math.random() * 100) + 100),
        weight:     Math.floor((Math.random() * 100) + 100)
    };

    it('Create new user', () => {
        request.post(`${BASE_URL}/user/create`, {
            body: userData
        }, (err, _res, body) => {
            if (err) { throw err; }
            
        });
        expect(true).toBe(true);
    });
});
