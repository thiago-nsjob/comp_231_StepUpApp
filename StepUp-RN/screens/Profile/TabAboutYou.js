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


export default class TabAboutYou extends React.Component{
  render(){
    return     <Content>
                    <Container>
                          <Form style={styles.space}>
                          <Label>Personal</Label>

                            <Item floatingLabel style={styles.space} >
                              <Label>Email</Label>
                              <Input />
                            </Item>

                            <Item floatingLabel style={styles.space}>
                              <Label>First Name</Label>
                              <Input  />
                            </Item>
                            
                            <Item floatingLabel style={styles.space} >
                              <Label>Last Name</Label>
                              <Input />
                            </Item>
                            
                            <Item  style={styles.space} >
                              <Label>Date of birth</Label>
                            <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                              />
                            </Item>
                              <Label>Bio</Label>
                              <Textarea  rowSpan={3} bordered placeholder=" about you..." style={styles.space}/>
                          </Form>
                  
                    </Container> 
    </Content>
  }
}