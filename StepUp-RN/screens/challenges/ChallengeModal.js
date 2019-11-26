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
  render() {
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
                <Button
                  style={{ margin: 5 }}
                  success
                  onPress={e => {
                    this.props.handleMessage("Successfully joined!");
                    this.props.toggle();
                  }}
                >
                  <Text>Join</Text>
                </Button>
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
