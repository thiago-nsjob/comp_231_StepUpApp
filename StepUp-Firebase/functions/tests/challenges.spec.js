const { now, userData, BASE_URL } = require('./testData');
const request = require('request');

describe('Challenges test suite', () => {

    let challengeId;

    it('View available challenges', () => {
        request.get(`${BASE_URL}/challenges/available`, (err, _res, body) => {
            if (err) { throw err; }
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);
            if (body.length > 0) {
                challengeId = body[0].id;
            }
            if (!challengeId) {
                throw new Error('An error occured - test failed');
            }
        });
    });

    it(`Join challenge - CTgd4pfcFDyAnD9Bbr2M`, () => {
        request.put(`${BASE_URL}/challenges/join/CTgd4pfcFDyAnD9Bbr2M?email=${userData.email}`, (err, _res, body) => {
            if (err) { throw err; }
            expect(body.msg).not.toBeUndefined();
            expect(body.msg).toEqual(`${userData.email} joined CTgd4pfcFDyAnD9Bbr2M`);
        });
    });
});