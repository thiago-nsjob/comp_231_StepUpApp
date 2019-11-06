

import React, { Component } from 'react';

export const ApiManager = {
  GET: async(url) =>{
    console.log('about to call'+url);
    return await fetch(url).then(async (response)=> 
        await response.json()
    );
  },

  POST: async(url,data) =>{
    console.log('about to call'+url);

    return await fetch(url,{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)})
      .then( async (response) => // body data type must match "Content-Type" header).then(async (response)=> 
        await response.json()
      )
      .catch((err)=>{
        console.log(err)
      });
  }
}
