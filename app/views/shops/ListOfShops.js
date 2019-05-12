import Expo from "expo";
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
import * as firebase from "firebase";

export class ListOfShops extends React.Component {
  static navigationOptions = {
    title: "Your shops"
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      options: []
    };
  }

  componentDidMount = async () => {
    this.getAllItems();
  };

  removeItem = itemToRemove => {
    let allItems = [...this.state.items];
    let filteredItems = allItems.filter(item => item.id != itemToRemove.id);
    this.setState({ items: filteredItems });
    var adaRef = firebase.database().ref("/listOfShopps/" + itemToRemove.id);
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
    console.log(item);
    this.props.navigation.navigate("ShopsEditForm", {
      item: item,
      onGoBack: () => this.refresh()
    });
  };

  handleAddEvent = () => {
    this.props.navigation.navigate("ShopsForm");
  };

  getAllItems() {
    firebase
      .database()
      .ref("listOfShopps/")
      .on("value", snapshot => {
        var a = [];
        for (let i in snapshot.val()) {
          a.push(snapshot.val()[i]);
        }

        this.setState({ items: a });
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
            navigate("ShopsForm", {
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
