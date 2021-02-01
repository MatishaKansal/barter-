import * as React from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Alert,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import HomeScreen from "./HomeScreen";

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      Iname: "",
      Idescription: "",
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addItem = (itemName, description) => {
    var userName = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("exchange_requests").add({
      username: userName,
      item_name: this.state.Iname,
      exchange_id: randomRequestId,
      item_description: this.state.Idescription,
    });
    this.setState({
      Iname: "",
      Idescription: "",
    });

    return Alert.alert("Item ready to exchange", "", [
      {
        text: "OK",
        onPress: () => {
          this.props.navigation.navigate("HomeScreen");
        },
      },
    ]);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Barter" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter item name"}
            onChangeText={(text) => {
              this.setState({
                Iname: text,
              });
            }}
            value={this.state.Iname}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            multiline
            numberOfLines={8}
            placeholder={"Item Description"}
            onChangeText={(text) => {
              this.setState({
                Idescription: text,
              });
            }}
            value={this.state.Idescription}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addItem(this.state.Iname, this.state.Idescription);
            }}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}
            >
              Add Item
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
