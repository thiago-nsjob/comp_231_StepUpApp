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
  Spinner
} from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./style/ChallengeEntry.style";
import SliderEntry from "./ChallengeEntry";
import styles, { colors } from "./style/index.style";
import { ENTRIES1, ENTRIES2 } from "./Entries";

const SLIDER_1_FIRST_ITEM = 1;

//adapted from https://github.com/archriss/react-native-snap-carousel/tree/master/example
export default class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      challengesData: {},
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };

   
  }

  async componentDidMount() {
    let result = await this.props.apiManager.GET(
      `https://step-up-app.firebaseapp.com/challenges/available`
    );
    let challengesData = {
      featured: result
    };
    this.setState({ challengesData: challengesData,loaded: true });
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  buildChallengesComponent(title, subtitle, data) {
    const { slider1ActiveSlide } = this.state;
    console.log(data);
    return (
      <View style={styles.exampleContainerDark}>
        <Text style={styles.title}>{`${title}`}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={data}
          renderItem={this._renderItem}
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
    const featureChallenges = this.buildChallengesComponent(
      "Featured challenges",
      "Sponsored by our supporters",
      this.state.challengesData.hasOwnProperty("featured")?this.state.challengesData.featured:[]
    );
    const myChallenges = this.buildChallengesComponent(
      "My challenges",
      "Challenges created by you",
      this.state.challengesData.hasOwnProperty("featured")?this.state.challengesData.featured:[]
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
