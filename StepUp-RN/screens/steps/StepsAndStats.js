import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Left, Body, Title, Right, Button, Fab, Toast, Item, Content, Input } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Dialog from "react-native-dialog";


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
    this._subscribe();
    // let profileData =   this.props.apiManager.GET('https://step-up-app.firebaseapp.com/steps/log?email={email_address}');
    // this.props.apiManager.POST('https://step-up-app.firebaseapp.com/steps/log?email=brentonh@email.com', this.state.stepsObj);


    // let distance = this.props.apiManager.GET('https://step-up-app.firebaseapp.com/steps/distance?email=brentonh@email.com');
    // distance.then( (response) => {
    //   console.log(response.total.distance);
    //   this.setState({
    //     distance: response.total.distance,
    //   })
    // });

    // let goal = this.props.apiManager.GET('https://step-up-app.firebaseapp.com/user/get/brentonh@email.com');
    // goal.then( (response) => {
    //   console.log(response.data.goal);
    //   this.setState({
    //     goal: response.data.goal,
    //   })
    // });

    //Setting a goal
    // this.props.apiManager.PUT("https://step-up-app.firebaseapp.com/user/update?email=brentonh@email.com", {goal: 888});


    // let total = this.props.apiManager.GET('https://step-up-app.firebaseapp.com/steps/total?email=brentonh@email.com');
    // total.then(console.log);
    // console.log(distance);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });

      const end = new Date();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      Pedometer.getStepCountAsync(midnight, end).then(
        result => {
          var newFill = (this.state.pastStepCount / this.state.goal) * 100;
          this.setState({
            fill: newFill,
            pastStepCount: result.steps,
            distance: result.steps / 1312,
          });
        },
        error => {
          this.setState({
            pastStepCount: "Could not get stepCount: " + error
          });
        }
      );
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          // isPedometerAvailable: "Could not get isPedometerAvailable: " + error
          isPedometerAvailable: "No",
        });
      }
    );

    const end = new Date();
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    Pedometer.getStepCountAsync(midnight, end).then(
      result => {
        this.setState({ pastStepCount: result.steps, })
        var newFill = (this.state.pastStepCount / this.state.goal) * 100;
        this.setState({
          fill: newFill,
          distance: Number((result.steps / 1312).toFixed(1)),
        });
      },
      error => {
        this.setState({
          // pastStepCount: "Could not get stepCount: " + error
          pastStepCount: 0,
        });
      }
    );

    //Setting month
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.setState({
      month: months[end.getMonth()],
    })

  };

  _showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleOk = () => {
    this.setState({ dialogVisible: false });
  };

  goalInputHandler = (enteredText) => {
    if (enteredText < this.state.pastStepCount) {
      enteredText = this.state.pastStepCount;
      this.setState({ goal: enteredText });
    } else {
      this.setState({ goal: enteredText });
    }
    this._subscribe();
  }


  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <Container style={styles.body}>
        <Header style={styles.header}>
          <Text>Goals and Steps</Text>
        </Header>

        <Content style={styles.container}>

          <Title style={styles.title}>{this.state.day} {this.state.month} {this.state.year}</Title>

          <View style={{ paddingLeft: "7%" }}>
            <AnimatedCircularProgress
              size={250}
              width={3}
              fill={this.state.fill}
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {
                (fill) => (
                  <Text>
                    {this.state.pastStepCount} steps
                    </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>

          <Content>
            <View style={{ paddingTop: 30, flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>

              <Text style={{ paddingTop: 10 }}> Daily Step Goal: {this.state.goal} </Text>
              <Button onPress={this._showDialog}>
                <Text> Update </Text>
              </Button>
              <View>
                <Dialog.Container visible={this.state.dialogVisible}>
                  <Dialog.Title>Account delete</Dialog.Title>
                  <Dialog.Description>
                    What do you want to change your goal to:
            </Dialog.Description>
                  <Dialog.Input onChangeText={this.goalInputHandler} />
                  <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                  <Dialog.Button label="OK" onPress={this.handleOk} />
                </Dialog.Container>
              </View>
            </View>
            <Text style={{ paddingTop: 10, paddingLeft: 10 }}> Current distance: {this.state.distance} km</Text>
          </Content>
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
