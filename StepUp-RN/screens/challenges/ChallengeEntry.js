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
  }
 

  closeModal() {
    this.setState({ visible: !this.state.visible });
  }
  
  render() {
    
    const {
      data: { title, url, description, distance, reward,id }
    } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={e => this.closeModal()}>
          <Card style={styles.slideInnerContainer}>
            <CardItem header>
              <Text numberOfLines={1} style={{fontSize: 20}}>{title}</Text>
              <Right>
                <Badge primary>
                  <Text>{distance}Km</Text>
                </Badge>
              </Right>
            </CardItem>
            <CardItem>
              <Image
                source={{ uri: url }}
                style={{ height: 200, width: null, flex: 1, borderRadius: 5 }}
              />
            </CardItem>
            <CardItem footer>
              <Text note numberOfLines={4} style={{fontSize: 15}}>
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
          id={id}
          handleMessage={this.props.showMessage}
          joinChallenge = {this.props.joinChallenge}
          leaveChallenge = {this.props.leaveChallenge}
          isJoined={this.props.isJoined}
        />
      </View>
    );
  }
}
