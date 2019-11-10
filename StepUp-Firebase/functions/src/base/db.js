const firebase = require('firebase');
const firebaseConfig = require('../config').firebase;

require('firebase/firestore');

const fbApp = firebase.initializeApp( firebaseConfig );

const db = fbApp.firestore();


module.exports = db;
