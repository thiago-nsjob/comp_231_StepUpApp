import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text,Left,Body,Title,Right,Button,Fab,Toast } from 'native-base';
import TabAboutYou from './TabAboutYou';
import TabBodyInfo from './TabBodyInfo';



export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
       showToast: false
      
    };
  }

  showMessage(message){
      Toast.show({
                text: message,
                buttonText: "Okay",
                duration: 3000
              });
 }

  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs >
          <Tab heading={<TabHeading><Icon type="FontAwesome" name="user" /><Text>About you</Text></TabHeading>}>
            <TabAboutYou onMessage = {this.showMessage} />
          </Tab>
          <Tab heading={<TabHeading><Icon type="FontAwesome" name="child" /><Text>Body Information</Text></TabHeading>}>
            <TabBodyInfo onMessage = {this.showMessage} />
          </Tab>
        </Tabs>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="list-ul" type="FontAwesome" />
            <Button style={{ backgroundColor: '#DD5144' }} onPressOut={(e)=>this.showMessage("Signed out!")}>
              <Icon name="sign-out" type="FontAwesome"  />
            </Button>
            <Button style={{ backgroundColor: '#34A34F' }} onPressOut={(e)=>this.showMessage("Profile saved!")}>
              <Icon name="save" type="FontAwesome"  />
            </Button>
          </Fab>
      </Container>
    );
  }
}