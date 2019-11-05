

import React, { Component } from 'react';

export const ApiManager = {
  GET: async(url) =>{
    console.log('about to call'+url);
    return await fetch(url).then(async (response)=> 
        await response.json()
    );
  }
}
