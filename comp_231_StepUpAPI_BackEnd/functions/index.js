// set up ========================
//const functions = require('firebase-functions');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const functions = require('firebase-functions')
//const firebase = require('firebase-admin')

var firebase = require("firebase/app")
// Add the Firebase products that you want to use
require("firebase/firestore")

const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./src/api/user')
const app = express()


const firebaseConfig = require('./config').firebaseConfig;


firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const usersRef = db.collection("UserProfile")

/*
const firebaseApp = firebase.initializeApp(
  functions.config.firebase
)

function getFacts(){
  const ref = firebaseApp.database().ref('facts')
  return ref.once('value').then(snap => snap.val())
}*/




// Middleware
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
)


//API for User Profile
// create or update user data
app.post('/api/addUser', async (req, res) => {
		   
    try {
        let data = req.body	

        //Merge data into the existing document if possible
        let userDoc = usersRef.doc('kelvintrinh175@gmail.com');

        let setWithOptions = await userDoc.set({
          capital: true
        }, {merge: true});
        
        let messesage = await userDoc.set(data);   
        res.send('success')

      } catch(error){
    
        response.status(500).send(error)
    
      }
      
})

//delete User
app.delete('/api/deleteUser', async (req,res) => {
 
try {
    await db.collection('UserProfile').doc('kelvintrinh176@gmail.com').delete();   
}
catch(error){
    response.status(500).send(error)
}

  res.send('hi! you requested delete')

})

//get a user data
app.get('/api/getUserbyEmail',async(req,res) =>{
  let userRef = usersRef.doc('kelvintrinh175@gmail.com')
  let getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists) {
       res.send('not success')
      } else {
        res.send(doc.data())
      }
    })
    .catch(err => {
      res.send('Error getting document', err);
    });

    //res.send('success!!!')

})

//get all User
app.get('/api/getAllUser', (req,res) => {
  
  let query = usersRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.send('No matching documents.')
      }  

      //res.send(snapshot)
      var listOfObjects = [];
      snapshot.forEach(doc => {
        listOfObjects.push(doc.data())       
      })

      res.send(listOfObjects)
      
    })
    .catch(err => {
      res.send('Error getting documents', err);
    });
  
})



app.get('/stepup', (request, response) => {
    response.send('hi! you requested /stepup');
})


// appends all the routes in user.js to /user endpoint
app.use('/user', userRoutes);

// Error Handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.json({msg: 'an error occured', err: err.message});
})

//app.listen(5001)
//console.log("Server is starting at port 5001")
exports.app = functions.https.onRequest(app) 

//    \/   Un-comment these 2 lines   \/
// const api = functions.https.onRequest( app ); // appends to firebase
// module.exports = { api };
