import React, { Component } from 'react';
import {ApiManager} from './ApiManager';

export const wrapIntoContext =(WrappedComponent)=>{

const Wrapper = React.createContext();

return class AppContext extends React.Component{
  constructor(props){
    super(props);
  } 
    render(){
      return <Wrapper.Provider value={{apiManager: ApiManager}}> 
            <WrappedComponent apiManager= {ApiManager}/>
      </Wrapper.Provider>
    }
  }
  
}

