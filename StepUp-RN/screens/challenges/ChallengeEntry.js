import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "./style/ChallengeEntry.style";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Right,
  Badge,
  Left,
  Toast
} from "native-base";
import ChallengeModal from "./ChallengeModal";

export default class ChallengeEntry extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  closeModal() {
    this.setState({ visible: !this.state.visible });
  }
  showMessage(message) {
    Toast.show({
      text: message,
      buttonText: "Okay",
      duration: 3000
    });
  }
  render() {
    const {
      data: { title, url, description, distance, reward }
    } = this.props;
    console.log(url);
    return (
      <View>
        <TouchableOpacity onPress={e => this.closeModal()}>
          <Card style={styles.slideInnerContainer}>
            <CardItem header>
              <Text numberOfLines={1}>{title}</Text>
              <Right>
                <Badge primary>
                  <Text>{distance}Km</Text>
                </Badge>
              </Right>
            </CardItem>
            <CardItem>
              <Image
                source={{ uri: url }}
                style={{ height: 150, width: null, flex: 1, borderRadius: 5 }}
              />
            </CardItem>
            <CardItem footer>
              <Text note numberOfLines={2}>
                {description}
              </Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <ChallengeModal
          visible={this.state.visible}
          toggle={this.closeModal}
          title={title}
          description={description}
          reward={reward}
          url ={url}
          handleMessage={this.showMessage}
        />
      </View>
    );
  }
}
