import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as firebase from "firebase";
import { CheckBox, FormLabel, FormInput } from "react-native-elements";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyD9fpv7Hu0naWevG5Lb4sG-uX1MWbcQWTE",
      authDomain: "shopping-list-b0dc8.firebaseapp.com",
      databaseURL: "https://shopping-list-b0dc8.firebaseio.com",
      projectId: "shopping-list-b0dc8",
      storageBucket: "shopping-list-b0dc8.appspot.com",
      messagingSenderId: "982858238516"
    };
    firebase.initializeApp(config);
  }
  onLoginPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        console.log("login");
        this.props.navigation.navigate("Home");
      })
      .catch(() => {
        console.log("login error");
        this.setState({ error: "Authentication failed", loading: false });
      });
  }

  onSingUpPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        console.log("singup");
        this.props.navigation.navigate("Home");
      })
      .catch(() => {
        console.log("singup error");
        this.setState({ error: "Authentication failed", loading: false });
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text> Loading</Text>;
    }
    return (
      <View>
        <Button onPress={this.onLoginPress.bind(this)} title="Login" />
        <Button onPress={this.onSingUpPress.bind(this)} title="Sign up" />
      </View>
    );
  }
  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <FormLabel>password</FormLabel>
        <FormInput
          value={this.state.password}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />
        {this.renderButtonOrLoading()}
      </View>
    );
  }
}
