const express = require('express');
const db = require('../base/db');

const middleware = require('../helpers/middleware');
const extractEmail = middleware.extractEmail();
const challenges = db.collection('Challenges');
//const userProfile = db.collection('UserProfile');
const rewards = db.collection('Reward');
const route = express.Router();
const admin = require('firebase-admin');

const rewardData = ['rewardName', 'Steprequired'];

route.get('/', (_, res) => {
    res.send('rewards page')
  });

route.get('/available', (_, res) => {
  
  let available = [];
  rewards.get()
         .then(snapshot => {

    if (snapshot.empty) {
      res.json({msg:'No matching documents.'});
      return;
    }  
                        
    snapshot.docs.forEach(doc => {
            let data = doc.data();
            data.rewardId = doc.id;
            available.push(data);
    });
    res.json(available);
  })
  .catch(err => {
    res.json({msg:'Error getting documents'});
  });

  
});

//did not work properly
route.put('/claim',(req,res,next) => {
      
  let data = req.body || {};
  let documentId;
  //'RewardName', '==', req.body.RewardName
  // Create a query against the collection to get a document
  //.
  rewards.where('RewardName', '==', req.body.RewardName)
         .where('active','==',true)
                     .get()
                     .then(snapshot => {
                        if (snapshot.empty) {
                          res.json({msg:'No matching documents.'});
                          return;
                        }  
                                            
                        snapshot.forEach(doc => {
                          documentId = doc.id;
                          //res.json({msg:data.id,save:doc.data()});
                        });
                        let ref =  rewards.doc(documentId);
                        /*
                        ref.set(data, { merge: true}).then(() => {
                            res.json({ msg: 'Successfully updated user reward', data }); // TEMP
                        });*/
                        ref.update({
                          users: admin.firestore.FieldValue.arrayUnion('kel@gmail.com')
                          //users:['kelvin','kelvin2']
                        }).then(() => {
                          res.json({ msg: 'Successfully updated user reward', data }); // TEMP
                        });
                      })
                      .catch(err => {                     
                      res.status('Error getting documents').send(err);
                      });
       
  
  

});
//

route.delete('/delete/:id', extractEmail, async(req,res)=>{

});



module.exports = route;


