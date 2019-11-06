const express = require('express');
const route = express.Router();


// path is really "/user/hello"
route.get('/hello', (req, res) => {
    res.send('You sent a request to /user/hello');
});

route.get('/:id', (req, res) => {
    res.send('you requested /user/' + req.params.id);
});


module.exports = route;
