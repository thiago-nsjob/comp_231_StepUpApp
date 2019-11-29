import React, { Component } from "react";
import {
  Container,
  Header,
  Thumbnail,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Spinner
} from "native-base";
import { StyleSheet, StatusBar } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

const styles = StyleSheet.create({
  initialSpace: {
    marginTop: 0 + StatusBar.currentHeight
  }
});

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      userId: "brenton@email.com",
      challengesData: undefined
    };
  }

  async componentDidMount() {
    let mychallenges = await this.props.apiManager.GET(
      `https://step-up-app.firebaseapp.com/challenges/joined?email=${this.state.userId}`
    );
    this.setState({ challengesData: mychallenges, loaded: true });
  }

  buildCharts() {
    if (this.state.challengesData) {
      return this.state.challengesData.map((item,i) => {
        console.log(item);
        return (
          <Card style={{height:300}} key={i}>
            <CardItem header>
              <Text>{item.title} progress</Text>
            </CardItem>
            
            <ProgressCircle
                style={{ height: 200 }}
                progress={item.progress/item.distance}
                progressColor={"rgb(134, 65, 244)"}
                animate = {true}
                animateDuration={100}
              /> 
            <Thumbnail large source={{ uri: item.url }} style={{position: 'absolute', alignSelf: 'center',    bottom: '35%'}} />
          </Card>
        );
      });
    } else return <Text>Nothing here</Text>;
  }

  render() {
    const charts = this.buildCharts();
    if (this.state.loaded) {
      return (
        <Container>
          <Header>
            <Body>
              <Text>Home</Text>
            </Body>
          </Header>
          <Content>{charts}</Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header>
            <Body>
              <Text>Loading....</Text>
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
