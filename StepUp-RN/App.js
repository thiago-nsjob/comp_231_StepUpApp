import React, { Component } from 'react';
import { Root } from "native-base";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Profile from './screens/Profile/Profile';


export default class App extends React.Component{
  render() {
    return     <Root>
           <Profile />
  </Root>;
  }
}


