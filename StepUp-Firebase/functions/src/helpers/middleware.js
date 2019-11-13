const bodyParser = require('body-parser');
const helmet = require('helmet');
const lo = require('lodash');

const emailRE = /^\w+\.?\w*@\w+\.\w+$/;



module.exports = {

    /**
     * Appends common middleware to an existing express app.
     * @param {Express} app 
     */
    attachCommon(app) {
        app.use(
            helmet(),
            bodyParser.json(),
            bodyParser.urlencoded({ extended: false }),
        );
    },


    extractEmail({ raiseError, testRegExp }) {
        let mw = {
            testRegExp: testRegExp != false,
            raiseError: raiseError != false
        };

        mw.fn = (req, _res, next) => {

            let email =  req.query.email || req.body.email;
        
            if (lo.isString(email) && (!mw.testRegExp || emailRE.test(email))) {
                req.email = email;
                return next();
            }
        
            return mw.raiseError ? next(new Error('Not an email!')) : next();
        };

        return mw.fn;
    },


    errorHandler(err, _req, res, _next) {
        console.error(err);
        let msg = err.message || 'An error occured!';
        res.json({ msg, err });
    }

};
