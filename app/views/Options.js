import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  Picker
} from "react-native";
import ValidationComponent from "react-native-form-validator";

export class Options extends ValidationComponent {
  static navigationOptions = {
    title: "Your options"
  };
  state = {
    fontSize: "25",
    fontColor: "#4286f4",
    error: ""
  };

  handleChangeFontSize = text => {
    this.setState({
      fontSize: parseInt(text, 10)
    });
    AsyncStorage.setItem("fontSize", text);
  };

  handleChangeFontColor = text => {
    this.setState({
      fontColor: text
    });
    AsyncStorage.setItem("fontColor", text);
  };

  handleSaveButton = () => {
    this.validate({
      fontSize: { numbers: true }
    });

    if (this.isFormValid() == true) {
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
          <Text style={styles.headText}>Change font size</Text>
          <View style={styles.centerContainer}>
            <TextInput
            underlineColorAndroid='transparent'
              style={styles.text}
              onChangeText={this.handleChangeFontSize}
              placeholder="Rozmiar czcionki"
              keyboardType="numeric"
              spellCheck={false}
            />
          </View>

          <Text style={styles.headText}>Change color</Text>
          <View style={styles.centerContainer}>
            <Picker
              selectedValue={this.state.fontColor}
              style={{ height: 50, width: 120,  }}
              onValueChange={this.handleChangeFontColor}
            >
              <Picker.Item label="Zielony" value="#2f8911" />
              <Picker.Item label="Czarny" value="#000000" />
              <Picker.Item label="Niebieski" value="#107ca3" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={this.handleSaveButton}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
        </View>
      </View>
    );
  }
}

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
    marginBottom: 10,
    width: "60%"
  },
  headText: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20
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
  buttonContainer: {
    marginTop: "50%"
  },
  centerContainer: {
    
    alignItems: "center"
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
