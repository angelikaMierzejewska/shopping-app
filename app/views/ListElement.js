import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { CheckBox } from "react-native-elements";

import { update } from "../../sql.js";
import * as firebase from "firebase";

export default class ListElement extends React.Component {
  state = {
    name: null,
    price: "",
    quantity: "",
    isBought: this.props.item.isBought,
    font: "",
    color: "#4286f4"
  };

  constructor(props) {
    super(props);
  }

  update = () => {
    console.log(this.state);
    var updates = {};
    updates["products/" + this.props.item.id] = {
      id: this.props.item.id,
      name: this.props.item.name,
      price: this.props.item.price,
      quantity: this.props.item.quantity,
      isBought: this.state.isBought
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
            <Text
              style={[
                { fontSize: this.props.options.font },
                { color: this.props.options.color }
              ]}
            >
              {this.props.item.name}
            </Text>
            <Text style={styles.title}>{this.props.item.price} PLN</Text>
            <Text style={styles.title}>{this.props.item.quantity}</Text>

            <View style={{ position: "absolute", right: 0, top: -5 }}>
              <CheckBox
                iconRight
                center
                containerStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#fff",
                  padding: 5
                }}
                checkedColor={this.props.options.color}
                title=""
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.props.item.isBought}
                onPress={() => {
                  this.setState({ isBought: !this.state.isBought });
                  this.update();
                }}
              />
            </View>
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
