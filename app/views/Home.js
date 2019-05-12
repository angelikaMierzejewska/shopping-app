import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button
} from "react-native";
import * as firebase from "firebase";

export class Home extends React.Component {
  static navigationOption = {
    title: "Welcome"
  };

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

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
      }
    });
  }

  handleListButtonEvent = () => {
    this.props.navigation.navigate("List");
  };

  handleOptionButtonEvent = () => {
    this.props.navigation.navigate("Options");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableHighlight
            onPress={() => navigate("List")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>List</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight
            onPress={() => navigate("Map")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Map</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight
            onPress={() => navigate("ListOfShops")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ListOfShops</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight
            onPress={() => navigate("Options")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Options</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  buttonRow: {
    paddingTop: "20%",
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 20
  },

  button: {
    height: 50,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    alignSelf: "stretch",
    marginLeft: 60,
    marginRight: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});
