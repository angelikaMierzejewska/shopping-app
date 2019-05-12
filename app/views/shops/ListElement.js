import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { CheckBox } from "react-native-elements";
import * as firebase from "firebase";

export default class ListElement extends React.Component {
  state = {
    title: "",
    description: "",
    radius: "",
    latitude: "",
    longitude: ""
  };

  constructor(props) {
    super(props);
  }

  update = () => {
    console.log(this.state);
    var updates = {};
    updates["listOfShopps/" + this.props.item.id] = {
      id: this.props.item.id,
      title: this.props.item.title,
      description: this.props.item.description,
      radius: this.props.item.radius,
      latitude: this.props.item.latitude,
      longitude: this.props.item.longitude
    };
    firebase
      .database()
      .ref()
      .update(updates);
  };

  render() {
    return (
      <View style={styles.card}>
        <TouchableHighlight
          onPress={this.props.edit}
          onLongPress={this.props.removeItem}
          underlayColor="white"
        >
          <View style={styles.cardHeader}>
            <Text> {this.props.item.title}</Text>
            <Text style={styles.title}>{this.props.item.description} PLN</Text>
            <Text style={styles.title}>{this.props.item.radius}</Text>
            <Text style={styles.title}>{this.props.item.latitude}</Text>
            <Text style={styles.title}>{this.props.item.longitude}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 10,
    marginTop: 5,
    marginBottom: 5
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row"
  },
  date: {
    fontWeight: "200",
    fontSize: 15,
    color: "#bdbdbd",
    width: "30%",
    textAlign: "right"
  },
  title: {
    fontWeight: "300",
    marginLeft: 10,
    textAlign: "left"
  },
  counterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  counter: {
    width: "25%",
    flex: 1
  },
  counterText: {
    fontSize: 40,
    textAlign: "center"
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: "100",
    color: "#a3a3a3",
    textAlign: "center",
    paddingTop: 0
  },
  checkBox: {
    backgroundColor: "#fff"
  }
});
