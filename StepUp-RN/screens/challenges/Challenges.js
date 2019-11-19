
import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {StyleSheet,StatusBar} from 'react-native';

const styles = StyleSheet.create({
  initialSpace: {
    marginTop:0 + StatusBar.currentHeight,
  }
});

export default class Challenges extends Component{
    render(){
        return         <Container >
        <Header>
          <Body>
            <Title>Challenges</Title>
          </Body>
          <Right />
        </Header>
        <Content>
           <Text>Challenges stuff</Text>
        </Content>
      </Container>  
    }
}