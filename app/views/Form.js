import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import ValidationComponent from "react-native-form-validator";
import { addItme } from "../../sql.js";
import * as firebase from "firebase";

class Form extends ValidationComponent {
  state = {
    name: "",
    price: "",
    quantity: "",
    isBought: false,
    error: ""
  };

  componentWillMount() {}

  handleChangeName = text => {
    this.setState({
      name: text
    });
  }

  handleChangePrice = text => {
    console.log(text);
    this.setState({
      price: parseFloat(text)
    });
  };
  handleChangeQuantity = text => {
    this.setState({
      quantity: parseInt(text, 10)
    });
  };

  handleAddPress = () => {
    this.validate({
      name: { minlength: 1, maxlength: 20, required: true },
      price: { numbers: true, required: true },
      quantity: { numbers: true, required: true }
    });

    if (this.isFormValid() == true) {
      // addItme(this.state);

      var newPostKey = firebase
        .database()
        .ref()
        .child("products")
        .push().key;

      const product = firebase
        .database()
        .ref("products/" + newPostKey)
        .set(
          {
            id: newPostKey,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            isBought: false
          },
          function(error) {
            if (error) {
              console.log(error);
            } else {
              console.log("saved" + product.id);
            }
          }
        );
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
            style={styles.text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangeName}
            placeholder="Product title"
            spellCheck={false}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangePrice}
            placeholder="Product price"
            keyboardType="numeric"
            spellCheck={false}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeQuantity}
            placeholder="Quantity"
            spellCheck={false}
          />
        </View>

        <TouchableHighlight onPress={this.handleAddPress} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
}

export default Form;

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
