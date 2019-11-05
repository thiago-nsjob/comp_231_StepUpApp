
import React,{Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


export default class Home extends React.Component {

 render(){
        return         <Container>
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
    }
}



 