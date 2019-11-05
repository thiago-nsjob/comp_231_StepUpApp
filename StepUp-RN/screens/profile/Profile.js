import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text,Left,Body,Title,Right,Button,Fab,Toast } from 'native-base';
import TabAboutYou from './TabAboutYou';
import TabBodyInfo from './TabBodyInfo';



export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        active: false,
        showToast: false,
        profileData:{
          email:"",
          firstName:"",
          lastName:"",
          dob:"",
          bio:"",
          weight:"",
          height:""
      }
    };

    this.handlePropChange = this.handlePropChange.bind(this);
  }

  componentDidMount(){
    let profileData =   this.props.apiManager.GET('https://jsonplaceholder.typicode.com/todos/1');
    console.log(this.state.profileData);
    this.setState({ profileData: profileData});
  }
  
  showMessage(message){
      Toast.show({
                text: message,
                buttonText: "Okay",
                duration: 3000
              });
 }

  handlePropChange(prop,value){
    console.log("prop: " + prop + " value: " + value);
    let tmp =  this.state.profileData;
    Reflect.set(tmp,prop,value);
    this.setState({profileData:tmp});
  }

  handleSave(msg){
    
    this.showMessage(msg);
  }

  render() {
    return (
      <Container>
        <Header hasTabs style={{marging:-10}}/>
        <Tabs >
          <Tab heading={<TabHeading><Icon type="FontAwesome" name="user" /><Text>About you</Text></TabHeading>}>
            <TabAboutYou onMessage = {this.showMessage} onPropChange = {this.handlePropChange} />
          </Tab>
          <Tab heading={<TabHeading><Icon type="FontAwesome" name="child" /><Text>Body Information</Text></TabHeading>}>
            <TabBodyInfo onMessage = {this.showMessage} onPropChange = {this.handlePropChange} />
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
            <Button style={{ backgroundColor: '#34A34F' }} onPressOut={(e)=>this.handleSave("Profile saved!")}>
              <Icon name="save" type="FontAwesome"  />
            </Button>
          </Fab>
      </Container>
    );
  }
}