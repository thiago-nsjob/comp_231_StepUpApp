const crypto = require('crypto');
const { secret } = require('../config');


module.exports = {

    /**
     * @param {String} s 
     */
    hashString(s) {
        let hash = crypto.createHash('sha1');
        hash = hash.update(s).update(secret || 'hello!');
        return hash.digest('hex');
    }

};
