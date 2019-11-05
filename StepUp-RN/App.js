import React, { Component } from 'react';
import { Root } from "native-base";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Profile from './screens/Profile/Profile';

<<<<<<< HEAD

export default class App extends React.Component{
  render() {
    return     <Root>
           <Profile />
=======
import{wrapIntoContext} from './components/Wrapper';

class App extends React.Component{
  render() {
    return <Root>
           <Profile {...this.props} />
>>>>>>> 2fbdf9f309f0af59c9be3396ad00fa48b8b0f083
  </Root>;
  }
}

<<<<<<< HEAD
=======
export default wrapIntoContext(App);


>>>>>>> 2fbdf9f309f0af59c9be3396ad00fa48b8b0f083

