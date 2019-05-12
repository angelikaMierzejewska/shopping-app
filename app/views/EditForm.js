import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from "react-native";

import { updateItem } from "../../sql.js";
import ValidationComponent from "react-native-form-validator";
import * as firebase from "firebase";

class EditForm extends ValidationComponent {
  item = this.props.navigation.getParam("item");
  state = {
    id: this.item.id,
    name: this.item.name,
    price: this.item.price.toString(),
    quantity: this.item.quantity.toString(),
    isBought: this.item.isBought,
    error: ""
  };

  componentDidMount() {
    console.log(this.state);
  }

  handleChangeName = text => {
    this.setState({
      name: text
    });
  };

  handleChangePrice = text => {
    this.setState({
      price: parseFloat(text)
    });
  };
  handleChangeQuantity = text => {
    this.setState({
      quantity: parseInt(text, 10)
    });
  };

  handleUpdatePress = () => {
    this.validate({
      name: { minlength: 1, maxlength: 20, required: true },
      price: { numbers: true, required: true },
      quantity: { numbers: true, required: true }
    });

    if (this.isFormValid() == true) {
      var updates = {};
      updates["products/" + this.state.id] = {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
        isBought: this.state.isBought
      };
      firebase
        .database()
        .ref()
        .update(updates);
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    } else {
      this.setState({
        error: this.getErrorMessages()
      });
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.fieldContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.text}
            onChangeText={this.handleChangeName}
            placeholder="Product title"
            spellCheck={false}
            value={this.state.name}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangePrice}
            placeholder="Product price"
            keyboardType="numeric"
            spellCheck={false}
            value={this.state.price}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeQuantity}
            placeholder="Quantity"
            spellCheck={false}
            value={this.state.quantity}
          />
        </View>

        <TouchableHighlight
          onPress={this.handleUpdatePress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableHighlight>
        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
}

export default EditForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    backgroundColor: "#fff",
    height: 40,
    borderWidth: 1,
    borderColor: "#d9d9db",
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
    marginBottom: 10
  },
  borderTop: {
    borderColor: "#edeeef",
    borderTopWidth: 0.5
  },
  button: {
    height: 50,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    alignSelf: "stretch",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  errorText: {
    textAlign: "center",
    color: "#f44242",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 15
  }
});
