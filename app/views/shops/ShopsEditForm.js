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

class ShopsEditForm extends ValidationComponent {
  item = this.props.navigation.getParam("item");
  state = {
    id: this.item.id,
    title: this.item.title,
    description: this.item.description,
    radius: this.item.radius,
    latitude: this.item.latitude,
    longitude: this.item.longitude
  };

  componentDidMount() {
    console.log(this.state);
  }

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

  handleUpdatePress = () => {
    this.validate({
      title: { minlength: 1, maxlength: 20, required: true }
    });

    if (this.isFormValid() == true) {
      var updates = {};
      updates["listOfShopps/" + this.state.id] = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        radius: this.state.radius,
        latitude: this.state.latitude,
        longitude: this.state.longitude
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
            onChangeText={this.handleChangeTitle}
            placeholder="Shop name"
            spellCheck={false}
            value={this.state.title}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangeDescription}
            placeholder="Description"
            spellCheck={false}
            value={this.state.description}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeRadius}
            placeholder="Radius"
            spellCheck={false}
            value={this.state.radius}
          />

          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangeLatitude}
            placeholder="Latitude"
            keyboardType="numeric"
            spellCheck={false}
            value={this.state.latitude.toString()}
          />
          <TextInput
            style={styles.text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={this.handleChangeLongitude}
            placeholder="Longitude"
            spellCheck={false}
            value={this.state.longitude.toString()}
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

export default ShopsEditForm;

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
