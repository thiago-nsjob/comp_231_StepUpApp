import React, {Component} from 'react';
import {Share, Button} from 'react-native';

export default class ShareExample extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          // 'React Native | A framework for building native apps using React',
          this.props.passedMessage + " I did this by using the StepUp App! Download it today.",
          
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          alert("Success!");
        } else {
          // shared
          alert("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        alert("Dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return <Button onPress={this.onShare} title="Share" />;
  }
}