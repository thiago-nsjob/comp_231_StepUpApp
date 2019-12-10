import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Left, Body, 
  Title, Right, Button, Fab, Toast, Item, Content, Input, Card, CardItem, Thumbnail} from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Dialog from "react-native-dialog";
import Share from './Share';


export default class StepsAndStats extends React.Component {
  state = {
    dialogVisible: false,
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    fill: 0,
    goal: 10000,
    distance: 0,
    year: new Date().getFullYear().toString(),
    month: new Date().getMonth().toLocaleString(),
    day: new Date().getDate().toLocaleString(),
    stepsObj: {
      steps: 1234,
    },
  };

  componentDidMount() {

  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  render() {
    return (
      <Container style={styles.body}>
        <Header style={styles.header}>
          <Text>Rewards</Text>
        </Header>

        <Content>
          <View>
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'data:image/png;base64,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'}} />
                <Body>
                  <Text>Tim Hortons</Text>
                  <Text note>Fast Food Chain</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'http://www.exhibitionpark.ca/wp-content/uploads/2016/06/tim-hortons-logo-Exhibition-Park-300x150.png'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>

            <CardItem>
              <Body>
                <Text>Congratulations! You have won a free breakfast meal from Tim Hortons! Please check your email with a link to 
                  redeem your free meal via our app.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="ios-share-alt" />
                  {/* <Text>Share</Text> */}
                  <Share passedMessage="I just won a free coffee from Tims!"/>
                </Button>
              </Left>
              {/* <Body>
                <Button transparent>
                  <Icon active name="logo-facebook" />
                  <Text>Post on Facebook</Text>
                </Button>
              </Body> */}
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://banner2.cleanpng.com/20180330/lde/kisspng-nike-swoosh-logo-brand-nike-5abe1b5153a517.7100795015224082733426.jpg'}} />
                <Body>
                  <Text>Nike</Text>
                  <Text note>Clothing Store</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://www.shoecarnival.com/dw/image/v2/BBSZ_PRD/on/demandware.static/-/Sites-scvl-master-catalog/default/dw046b9c56/96791_192008_1.jpg?sw=700&sh=593&sm=fit'}} style={{height: 250, width: null, flex: 1}}/>
            </CardItem>

            <CardItem>
              <Body>
                <Text>Wow, what an achievement! Thank you for completing the challenge, for your reward we want to offer you 80% off our 
                  newest sneaker, the  Nike® Viale! The all mesh on the forefoot upper, with synthetic suede foxing provides solid style. 
                  The lugs surrounding a carved channel in the outsole provide enhanced stability and traction to keep you walking in 
                  solid comfort throughout the day. Add the Nike® Viale to your cart today for unlimited style and performance tomorrow.
                  Please check your email for details!
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="ios-share-alt" />
                  {/* <Text>Share</Text> */}
                  <Share passedMessage="I just got 80% off Nike's newest shoe!"/>
                </Button>
              </Left>
              {/* <Body>
                <Button transparent>
                  <Icon active name="logo-facebook" />
                  <Text>Post on Facebook</Text>
                </Button>
              </Body> */}
              <Right>
                <Text>16h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </View>        
        </Content>


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    marginBottom: 0,
  },
  header: {
    marginBottom: 0,
    paddingBottom: 0,
    alignItems: "center",
    backgroundColor: '#A9A9A9'
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 23,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#d6d7da',
  },

});
