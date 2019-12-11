const helmet = require('helmet');
const lo = require('lodash');
const express = require('express');

const emailRE = /^\w+\.?\w*@\w+\.\w+$/;

/**
 * @param {Error} err
 * @param {express.request} _req
 * @param {express.response} res
 * @param {(err?:Error)=>void} _next
 */
const internalErrorHandler = (err, _req, res, _next) => {
    Promise.reject(err).catch(console.error);
    let msg = err.message || 'An error occured!';
    let stack = err.stack || '';
    res.status(500).type('json').json({ msg, stack });
};


/**
 * @param {express.request} req
 * @param {express.response} res
 */
const pageNotFoundHandler = (req, res) => {
    res.status(404).send(
        `Cannot ${req.method} ${req.path}`
    );
};



module.exports = {

    /**
     * Appends common middleware to an existing express app.
     * @param {express.application} app 
     */
    attachCommon(app) {
        if (app && lo.isFunction(app.use)) {
            app.use(
                helmet(),
                express.json(),
                express.urlencoded({ extended: false }),
            );
        }
        return app;
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


    /**
     * @param {express.application} app
     */
    attachErrorHandlers(app) {
        if (app && lo.isFunction(app.use)) {
            app.use(
                pageNotFoundHandler,
                internalErrorHandler
            );
        }
        return app;
    },

};
