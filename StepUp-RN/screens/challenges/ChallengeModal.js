import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { View } from "react-native";
import Modal from "react-native-modal";



export default class ChallengeModal extends Component {

  buildChallengeAction(){
    if (this.props.isJoined)
    return (
      <Button
        style={{ margin: 5 }}
        success
        onPress={e => {
          this.props.toggle();
          this.props.leaveChallenge(this.props.id);
        }}
      >
        <Text>Leave</Text>
      </Button>
    );
  else
    return (
      <Button
        style={{ margin: 5 }}
        success
        onPress={e => {
          this.props.toggle();
          this.props.joinChallenge(this.props.id);
        }}
      >
        <Text>Join</Text>
      </Button>
    );
  } 

  render() {
    const action = this.buildChallengeAction()
    

    return (
      <Modal isVisible={this.props.visible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: this.props.url }} />
                <Body>
                  <Text>{this.props.title}</Text>
                  <Text note>{this.props.description}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Awarding:</Text>
                <Text note>{this.props.reward}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                {action}
              </Left>
              <Right>
                <Button
                  style={{ margin: 5 }}
                  danger
                  title="Hide modal"
                  onPress={e => this.props.toggle()}
                >
                  <Text>Close</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </View>
      </Modal>
    );
  }
}
