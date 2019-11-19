import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  Text,
  Icon,
  ScrollableTab,
  Content,
  Form,
  Textarea,
  Card,
  CardItem,
  Item,
  Input,
  Label,
  DatePicker
} from "native-base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  space: {
    margin: 10,
    paddingBottom: 20
  }
});

export default class TabAboutYou extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleSetValue(prop, val) {
    this.setState({ [prop]: val });
    this.props.onPropChange(prop, val);
  }
  render() {
    console.log(this.props.dob.getFullYear() +"-"+ this.props.dob.getMonth()+1 +"-"+ this.props.dob.getDate());
    return (
      <Content>
        <Container>
          <Form style={styles.space}>
            <Label>Personal</Label>

            <Item floatingLabel style={styles.space}>
              <Label>Email</Label>
              <Input
                onChangeText={e => this.props.onPropChange("email", e)}
                value={this.props.email}
              />
            </Item>

            <Item floatingLabel style={styles.space}>
              <Label>First Name</Label>
              <Input
                onChangeText={e => this.props.onPropChange("firstName", e)}
                value={this.props.firstName}
              />
            </Item>

            <Item floatingLabel style={styles.space}>
              <Label>Last Name</Label>
              <Input
                onChangeText={e => this.props.onPropChange("lastName", e)}
                value={this.props.lastName}
              />
            </Item>

            <Item style={styles.space}>
              <Label>Date of birth</Label>
              <DatePicker
                locale={"en"}
                defaultDate={new Date(this.props.dob.getFullYear(), this.props.dob.getMonth(), this.props.dob.getDate())}

                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={e => this.props.onPropChange("dob", e)}
                disabled={false}
              />
            </Item>
            <Label>Bio</Label>
            <Textarea
              rowSpan={3}
              bordered
              placeholder=" about you..."
              style={styles.space}
              onChangeText={e => this.props.onPropChange("bio", e)}
              value={this.props.bio}
            />
          </Form>
        </Container>
      </Content>
    );
  }
}
