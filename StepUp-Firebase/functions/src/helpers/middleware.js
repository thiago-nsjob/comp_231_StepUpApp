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
        if (app && lo.isFunction(app.use)) {
            app.use(
                helmet(),
                bodyParser.json(),
                bodyParser.urlencoded({ extended: false }),
            );
        }
    },


    extractEmail({ raiseError, testRegExp }={}) {
        let mw = {
            testRegExp: testRegExp != false,
            raiseError: raiseError != false
        };

        return mw.fn = (req, _res, next) => {

            let email =  req.query.email || req.body.email;
        
            if (lo.isString(email) && (!mw.testRegExp || emailRE.test(email))) {
                req.email = email;
                return next();
            }
        
            return mw.raiseError ? next(new Error('Not an email!')) : next();
        };
    },


    pageNotFoundHandler(req, res) {
        res.status(404).send(
            `Cannot ${req.method} ${req.path}`
        );
    },

    internalErrorHandler(err, _req, res, _next) {
        console.error(err);
        let msg = err.message || 'An error occured!';
        res.status(500).set({
            'Content-Type': 'application/json'
        }).json({ msg, err });
    }

};
