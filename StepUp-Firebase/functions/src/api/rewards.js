const db = require('../base/db');
const challenges = db.collection('Challenges');
const rewards = db.collection('Reward');

const middleware = require('../helpers/middleware');
const extractEmail = middleware.extractEmail();
const { attachCommon, attachErrorHandlers } = middleware;

const express = require('express');
const route = attachCommon( express() );
const firebase = require('firebase');

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


route.put('/claim',extractEmail,(req,res,next) => {
      
  let data = req.body || {};
  let documentId,stepRequired;

  // Create a query against the collection to get a document
  //looking for a reward based on name and status
  rewards.where('RewardName', '==', req.body.RewardName)
         .where('active','==',true)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              res.json({msg:'No matching documents.'});
              return;
            }  
            //get rewardId and step required for the reward                    
            snapshot.forEach(doc => {
              documentId = doc.id;                          
              stepRequired = doc.data().StepRequired;
            });

            //
            let ref =  rewards.doc(documentId);
            
            if(req.body.steps >= stepRequired)
            {
              ref.update({
                users: firebase.firestore.FieldValue.arrayUnion(req.body.email)                          
                }).then(() => {
                            res.json({ msg: 'Successfully updated user reward', data,steps:stepRequired  });
                });
            }
            else{
              res.json({
                msg:'Not enough steps'
              });
            }
              
          })
          .catch(err => {                     
          res.status('Error getting documents').send(err);
          });

  
  

});
//

route.delete('/delete', extractEmail, (req,res)=>{
  throw new Error('Not yet implemented');
});


module.exports = attachErrorHandlers( route );
