const request = require('request');

const { now, userData, BASE_URL } = require('./testData');

describe('User test suite', () => {

    it(`Create new user - ${now}`, () => {
        request.post(`${BASE_URL}/user/create`, {
            json: userData
        }, (err, _res, body) => {
            if (err) { throw err; }
            console.log('body', body);
            expect(body.data.email).toEqual(userData.email);
        });
    });

    it(`Get user - ${now}`, () => {
        request.get(`${BASE_URL}/user/get/${userData.email}`, (err, _res, body) => {
            if (err) { throw err; }
            expect(body.data.dob).not.toBeUndefined();
            expect(body.data.dob).toEqual(userData.dob);
        });
    });

    it(`Update user - ${now}`, () => {
        request.put(`${BASE_URL}/user/update?email=${userData.email}`, {
            json: { firstName: `f${Date.now()}` }
        }, (err, _res, body) => {
            if (err) { throw err; }
            expect(body.data.firstName).not.toBeUndefined();
            expect(body.data.firstName).not.toEqual(userData.firstName);
        });
    });

});
