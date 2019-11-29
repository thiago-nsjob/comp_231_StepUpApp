import React, { Component } from 'react';
import { Root,Drawer } from "native-base";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer,createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';
import StepsAndStats from './screens/steps/StepsAndStats';
import Challenges from './screens/challenges/Challenges';
import{wrapIntoContext} from './components/Wrapper';


const AppNavigator = createDrawerNavigator({
  Home: {
    screen: wrapIntoContext(Home), 
  },
  Profile:{
      screen: wrapIntoContext(Profile)
  },
  Stats:{
    screen: wrapIntoContext(StepsAndStats)
  },
  Challenges:{
    screen: wrapIntoContext(Challenges)
  }
} );

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }


  render() {

    const AppContainer =  createAppContainer(AppNavigator);

    if (!this.state.isReady) {
      return <AppLoading />;
    }
     return (   
       
       <Root>
                <AppContainer /> 
                {/* <StepsAndStats /> */}
      </Root>
       
         
      ); 
  }
}

export default App;




