import React, { Component } from 'react';
import { Container, Header, Tab, Tabs,Text,Icon, ScrollableTab
,Content,Form,Textarea,Card,CardItem,Item,Input,Label,DatePicker } from 'native-base';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  space: {
    margin:10,
    paddingBottom:20,
  }
});

export default class TabBodyInfo extends React.Component{
  render(){
    return  <Content>
                    <Container>
                          <Form style={styles.space}>
                            <Item fixedLabel style={styles.space} >
                              <Label><Icon type="FontAwesome5" name="weight" /> Weight: </Label>
                              <Input onChangeText={(e)=>this.props.onPropChange("weight",e)}/>
                            </Item> 

                            <Item fixedLabel style={styles.space} >
                              <Label><Icon type="FontAwesome" name="arrows-v" /> Height: </Label>
                              <Input onChangeText={(e)=>this.props.onPropChange("height",e)}/>
                            </Item> 
                          </Form>
                    </Container> 
                    
    </Content>

  }
}