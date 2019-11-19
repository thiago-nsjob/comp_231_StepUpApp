import React, { Component } from "react";
import {
  Container,  Header,  Tab,
  Tabs,  TabHeading,  Icon,
  Text,  Left,  Body,
  Title,  Right,  Button,
  Fab,  Toast,Spinner,Content
} from "native-base";
import TabAboutYou from "./TabAboutYou";
import TabBodyInfo from "./TabBodyInfo";
import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  initialSpace: {
    marginTop: 0 + StatusBar.currentHeight
  },
  title: {
    color: "#FFF7F0"
  }
});

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      showToast: false,
      loaded: false,
      profileData: {
        email: "brenton@email.com",
        firstName: "",
        lastName: "",
        dob: "",
        bio: "",
        weight: "",
        height: ""
      }
    };

    this.handlePropChange = this.handlePropChange.bind(this);
  }

  async componentDidMount() {
    let result = await this.props.apiManager.GET(
      `https://step-up-app.firebaseapp.com/user/get/brenton@email.com`
    );
    let tmp = {
      email: this.state.profileData.email,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      dob: result.data.dob,
      bio: result.data.hasOwnProperty("bio")
        ? result.data.bio
        : this.state.profileData.bio,
      height: result.data.hasOwnProperty("height")
        ? result.data.height
        : this.state.profileData.height,
      weight: result.data.hasOwnProperty("weight")
        ? result.data.weight
        : this.state.profileData.weight
    };
    this.setState({ profileData: tmp, loaded: true });
    console.log(this.state);
  }

  showMessage(message) {
    Toast.show({
      text: message,
      buttonText: "Okay",
      duration: 3000
    });
  }

  handlePropChange(prop, value) {
    let tmp = this.state.profileData;
    Reflect.set(tmp, prop, value);
    this.setState({ profileData: tmp });
  }

  async handleSave(msg) {
    let result = await this.props.apiManager.PUT(
      `https://step-up-app.firebaseapp.com/user/update`,
      this.state.profileData
    );
    console.log(result);
    this.showMessage(msg);
  }

  render() {
    if (this.state.loaded) {
      return (
        <Container>
          <Header hasTabs>
            <Body>
              <Text style={styles.title}>Profile</Text>
            </Body>
          </Header>
          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Icon type="FontAwesome" name="user" />
                  <Text>About you</Text>
                </TabHeading>
              }
            >
              <TabAboutYou
                onMessage={this.showMessage}
                onPropChange={this.handlePropChange}
                firstName={this.state.profileData.firstName}
                lastName={this.state.profileData.lastName}
                email={this.state.profileData.email}
                bio={this.state.profileData.bio}
                dob={new Date(this.state.profileData.dob)}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon type="FontAwesome" name="child" />
                  <Text>Body Information</Text>
                </TabHeading>
              }
            >
              <TabBodyInfo
                onMessage={this.showMessage}
                onPropChange={this.handlePropChange}
                height={this.state.profileData.height}
                weight={this.state.profileData.weight}
              />
            </Tab>
          </Tabs>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="list-ul" type="FontAwesome" />
            <Button
              style={{ backgroundColor: "#DD5144" }}
              onPressOut={e => this.showMessage("Signed out!")}
            >
              <Icon name="sign-out" type="FontAwesome" />
            </Button>
            <Button
              style={{ backgroundColor: "#34A34F" }}
              onPressOut={e => this.handleSave("Profile saved!")}
            >
              <Icon name="save" type="FontAwesome" />
            </Button>
          </Fab>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header>
            <Body>
              <Text style={styles.title}>Profile</Text>
            </Body>
          </Header>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    }
  }
}
