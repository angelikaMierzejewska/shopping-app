import Expo, { SQLite } from "expo";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import ListElement from "./ListElement.js";
import { createTable, remove } from "../../sql.js";
import * as firebase from "firebase";

const db = SQLite.openDatabase("items11.db");

export class List extends React.Component {
  static navigationOptions = {
    title: "Your shopping list"
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      items2: [],
      options: []
    };
    this.getFontSize();
    this.getFontColor();
  }

  componentDidMount = async () => {
    this.getAllItems();
  };

  removeItem = itemToRemove => {
    let allItems = [...this.state.items];
    let filteredItems = allItems.filter(item => item.id != itemToRemove.id);
    this.setState({ items: filteredItems });
    var adaRef = firebase.database().ref("/products/" + itemToRemove.id);
    adaRef
      .remove()
      .then(function() {
        console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  };

  updateItem = () => this.getAllItems();

  refresh = () => this.getAllItems();

  edit = item => {
    this.props.navigation.navigate("EditForm", {
      item: item,
      onGoBack: () => this.refresh()
    });
  };

  getFontSize = async () => {
    try {
      let fontsize = await AsyncStorage.getItem("fontSize");
      this.state.options.font = parseInt(fontsize);
    } catch (error) {
      console.log(error.message);
    }
  };

  getFontColor = async () => {
    try {
      let color = await AsyncStorage.getItem("fontColor");
      this.state.options.color = color;
    } catch (error) {
      console.log(error.message);
    }
  };

  handleAddEvent = () => {
    this.props.navigation.navigate("Form");
  };

  getAllItems() {
    console.log("get all item");
    firebase
      .database()
      .ref("products/")
      .on("value", snapshot => {
        var a = [];
        for (let i in snapshot.val()) {
          a.push(snapshot.val()[i]);
        }

        this.setState({ items: a });
        console.log(this.state.items);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.headStyle}>
        <FlatList
          key="flatlist"
          data={this.state.items}
          style={styles.list}
          keyExtractor={item => item.id}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <ListElement
              item={item}
              options={this.state.options}
              index={index}
              removeItem={() => {
                this.removeItem(item);
              }}
              edit={() => {
                this.edit(item);
              }}
            />
          )}
        />

        <TouchableHighlight
          onPress={() =>
            navigate("Form", {
              onGoBack: () => this.refresh()
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: "right",
    color: "#fff",
    fontSize: 20
  },
  headStyle: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingRight: 10,
    width: "100%"
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
  list: {
    height: "87%"
  }
});
