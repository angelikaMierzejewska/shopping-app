import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import ValidationComponent from "react-native-form-validator";
import * as firebase from "firebase";

class Form extends ValidationComponent {
  state = {
    title: "",
    description: "",
    radius: "",
    latitude: "",
    longitude: ""
  };

  componentWillMount() {}

  handleChangeTitle = text => {
    this.setState({
      title: text
    });
  };

  handleChangeDescription = text => {
    this.setState({
      description: text
    });
  };
  handleChangeRadius = text => {
    this.setState({
      radius: text
    });
  };

  handleChangeLatitude = text => {
    this.setState({
      latitude: parseFloat(text.replace(/,/g, "."))
    });
  };
  handleChangeLongitude = text => {
    this.setState({
      longitude: parseFloat(text.replace(/,/g, "."))
    });
  };

  handleAddPress = () => {
    this.validate({
      title: { minlength: 1, maxlength: 20, required: true }
    });

    if (this.isFormValid() == true) {
      var newPostKey = firebase
        .database()
        .ref()
        .child("listOfShopps")
        .push().key;

      const product = firebase
        .database()
        .ref("listOfShopps/" + newPostKey)
        .set(
          {
            id: newPostKey,
            title: this.state.title,
            description: this.state.description,
            radius: this.state.radius,
            latitude: this.state.latitude,
            longitude: this.state.longitude
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
            onChangeText={this.handleChangeTitle}
            placeholder="Shop name"
            spellCheck={false}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangeDescription}
            placeholder="Description"
            spellCheck={false}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeRadius}
            placeholder="Radius"
            spellCheck={false}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeLatitude}
            placeholder="Latitude"
            spellCheck={false}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeLongitude}
            placeholder="Longitude"
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
