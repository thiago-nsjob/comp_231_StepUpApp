import React, { Component } from "react";
import { Platform, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Right,
  Body,
  Icon,
  Text,
  Spinner,Toast

} from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./style/ChallengeEntry.style";
import ChallengeEntry from "./ChallengeEntry";
import styles, { colors } from "./style/index.style";
import { ENTRIES1, ENTRIES2 } from "./Entries";

const SLIDER_1_FIRST_ITEM = 1;

//adapted from https://github.com/archriss/react-native-snap-carousel/tree/master/example
export default class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userId:"brenton@email.com",
      challengesData: {},
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };

    this.joinChallenge = this.joinChallenge.bind(this);
    this.leaveChallenge = this.leaveChallenge.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  async componentDidMount() {
    
    
    let featuredChallenges = await this.props.apiManager.GET(`https://step-up-app.firebaseapp.com/challenges/available`);

    let mychallenges =  await this.props.apiManager.GET(`https://step-up-app.firebaseapp.com/challenges/joined?email=${this.state.userId}`);

    let challengesData = {
      featured: featuredChallenges,
      mychallenges: mychallenges
    };
    this.setState({ challengesData: challengesData,loaded: true });

  }

  showMessage(message) {
    Toast.show({
      text: message,
      buttonText: "Okay",
      duration: 3000
    });
  }

  async joinChallenge(challengeId){
    let result = await this.props.apiManager.PUT(
      `https://step-up-app.firebaseapp.com/challenges/join/${challengeId}?email=${this.state.userId}`
    );
    
    this.showMessage(result.msg);

    await this.componentDidMount();
  }

  async leaveChallenge(challengeId){
    let result = await this.props.apiManager.PUT(
      `https://step-up-app.firebaseapp.com/challenges/leave/${challengeId}?email=${this.state.userId}`
    );

    this.showMessage(result.msg);
    await this.componentDidMount();
  } 

  _renderItem({ item,joinChallenge,showMessage,leaveChallenge,isJoined}) {
    return <ChallengeEntry data={item} showMessage ={showMessage} joinChallenge = {joinChallenge} leaveChallenge={leaveChallenge} isJoined = {isJoined}/>;
  }

  buildFeaturedChallenges(title, subtitle, data) {
    const { slider1ActiveSlide } = this.state;
    
    return (
      <View style={styles.challengeContainerDark}>
        <Text style={styles.title}>{`${title}`}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={data}
          renderItem={(e)=>this._renderItem({joinChallenge:this.joinChallenge,showMessage:this.showMessage,leaveChallenge:this.leaveChallenge,isJoined:false,...e})}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.gray}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  buildMyChallenges(title, subtitle, data) {
    const { slider1ActiveSlide } = this.state;
    return (
      <View style={styles.challengeContainerDark}>
        <Text style={styles.title}>{`${title}`}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={data}
          renderItem={(e)=>this._renderItem({joinChallenge:this.joinChallenge,showMessage:this.showMessage,leaveChallenge:this.leaveChallenge,isJoined:true,...e})}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.gray}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  render() {
   
    const featureChallenges = this.buildFeaturedChallenges(
      "Featured challenges",
      "Sponsored by our supporters",
      this.state.challengesData.hasOwnProperty("featured")?this.state.challengesData.featured:[],
      this.showMessage
    );
    const myChallenges = this.buildMyChallenges(
      "My challenges",
      "Challenges created by you",
      this.state.challengesData.hasOwnProperty("mychallenges")?this.state.challengesData.mychallenges:[]
    );

    if (this.state.loaded) {
      return (
        <Container>
          <Header>
            <Body>
              <Title>Challenges</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            {featureChallenges}
            {myChallenges}
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header>
            <Body>
              <Text style={styles.title}>Loading challenges....</Text>
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
