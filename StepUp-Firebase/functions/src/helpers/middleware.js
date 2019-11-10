const bodyParser = require('body-parser');
const helmet = require('helmet');

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


    errorHandler(err, _req, res, _next) {
        console.error(err);
        let msg = err.message || 'An error occured!';
        res.json({ msg, err });
    }

};
