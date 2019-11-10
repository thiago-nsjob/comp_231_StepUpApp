const functions = require('firebase-functions')

const express = require('express');
const app = express();

const userRoutes = require('./src/api/user');
const stepsRoutes = require('./src/api/steps');

const db = require('./src/base/db');
const middleware = require('./src/helpers/middleware');


const usersRef = db.collection("UserProfile");


// function getFacts(){
//   const ref = firebaseApp.database().ref('facts')
//   return ref.once('value').then(snap => snap.val())
// }


middleware.attachCommon( app );






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



// Sets up routes

app.use('/user', userRoutes);

app.use('/steps', stepsRoutes);



// Appends Error Handler

app.use( middleware.errorHandler );


exports.app = functions.https.onRequest( app ); 
