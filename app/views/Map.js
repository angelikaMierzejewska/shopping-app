import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import * as firebase from "firebase";
import { Constants, MapView, Location, Permissions, Notifications } from "expo";
import { Marker } from "react-native-maps";
import geolib from "geolib";

export class Map extends React.Component {
  state = {
    myLocation: {
      coords: {
        latitude: 52.224055,
        longitude: 20.993597,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    },
    markers: [],
    location: null,
    errorMessage: null,
    visitedShops: []
  };

  async componentDidMount() {
    this.getAllItems();
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }

  createNotification(i, massage) {
    const localNotification = {
      title: massage,
      body:
        i.title +
        " " +
        i.description +
        " latitude: " +
        i.latitude +
        " longitude: " +
        i.longitude
    };
    const schedulingOptions = {
      time: new Date().getTime() + 1
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  }

  getAllItems() {
    firebase
      .database()
      .ref("listOfShopps/")
      .on("value", items => {
        var a = [];
        for (let i in items.val()) {
          a.push(items.val()[i]);
        }
        this.setState({ markers: a });
      });
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let myLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      maximumAge: 2
    });
    this.setState({ myLocation });
    this.isPointInCenter();
  };

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }

  isPointInCenter(userPosition) {
    console.log(userPosition);
    console.log("************");
    if (this.state.markers.length > 0) {
      for (let i of this.state.markers) {
        const markerPosition = {
          latitude: parseFloat(i.latitude),
          longitude: parseFloat(i.longitude)
        };
        let isInCenter = geolib.isPointInCircle(
          userPosition,
          markerPosition,
          i.radius
        );
        var isInArray = this.containsObject(i, this.state.visitedShops);

        if (isInCenter) {
          if (isInArray == false) {
            this.setState({ visitedShops: [...this.state.visitedShops, i] });
            this.createNotification(i, "Welcome in shop");
          } else {
          }
        } else {
          if (isInArray == true) {
            this.createNotification(i, "Thank you for the visit");
            let filteredArray = this.state.visitedShops.filter(
              item => item !== i
            );
            this.setState({ visitedShops: filteredArray });
          }
        }
      }
    }
  }

  getLocation = () => {
    this.mlocation = Expo.Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1
      },
      loc => {
        if (loc.timestamp) {
          this.setState({ myLocation: loc });
        } else {
          this.setState({ errorMessage: "Problems on update location" });
        }
      }
    );
  };

  render() {
    return (
      <View>
        <MapView
          style={{ alignSelf: "stretch", height: 400 }}
          region={this.state.myLocation.coords}
          showsScale={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          followsUserLocation={true}
          onUserLocationChange={locationChangedResult =>
            this.isPointInCenter(locationChangedResult.nativeEvent.coordinate)
          }
        >
          {this.state.markers.map((marker, i) => (
            <Marker
              coordinate={{
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude)
              }}
              title={marker.title}
              description={marker.description}
              key={i}
            />
          ))}
        </MapView>
        <TouchableHighlight onPress={this.createNotification}>
          <Text>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
