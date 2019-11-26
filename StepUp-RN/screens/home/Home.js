
import React,{Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {StyleSheet,StatusBar,Image} from 'react-native';

const styles = StyleSheet.create({
  initialSpace: {
    marginTop:0 + StatusBar.currentHeight,
  }
});



export default class Home extends React.Component {

 render(){
        return( 
        <Container >
        <Header>
          <Body>
            <Title>Home</Title>
            
          </Body>
          <Right />
        </Header>
        <Content>
           <Text>Home stuff</Text>
        </Content>
      </Container>  
        )}
}



 