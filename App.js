import React from "react";
import { createStackNavigator } from "react-navigation";
import { Home } from "./app/views/Home.js";
import { LoginScreen } from "./app/views/LoginScreen.js";
import { Map } from "./app/views/Map.js";
import { List } from "./app/views/List.js";
import { ListOfShops } from "./app/views/shops/ListOfShops.js";
import { Options } from "./app/views/Options.js";
import Form from "./app/views/Form.js";
import ShopsForm from "./app/views/shops/Form.js";
import ShopsEditForm from "./app/views/shops/ShopsEditForm.js";
import EditForm from "./app/views/EditForm.js";

state = {
  text: null
};

const App = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen
    },
    Home: {
      screen: Home
    },

    Options: {
      screen: Options
    },
    List: {
      screen: List
    },

    Form: {
      screen: Form
    },
    EditForm: {
      screen: EditForm
    },
    Map: {
      screen: Map
    },

    ListOfShops: {
      screen: ListOfShops
    },
    ShopsForm: {
      screen: ShopsForm
    },
    ShopsEditForm: {
      screen: ShopsEditForm
    }
  },

  {
    initialRouteName: "Home"
  }
);

export default App;
