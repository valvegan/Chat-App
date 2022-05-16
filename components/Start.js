import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
//native component to allow text components to be clickable (and button)
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";
//background image
import BgImg from "../assets/BackgroundImage.png";
//user icon
import MySvg from "../assets/icon.svg";
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg";
import { SvgCssUri } from "react-native-svg";

//start component which requires to enter a name and allows to customise chat colors
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", fontsLoaded: false };
  }

  async loadFonts() {
    await Font.loadAsync({
      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      Poppins: {
        uri: require("../assets/fonts/Poppins-Light.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BgImg} style={styles.backgroundImg}>
          <Text style={styles.Title}>The chat App</Text>
          <View style={styles.startBox}>
            <View style={styles.inputText}>
              <SvgCssUri
                width="20%"
                height="20%"
                uri="https://raw.githubusercontent.com/valvegan/hello-world/49434bb08d18ce177437e2ec6e3f34f0d3000a04/assets/icon.svg"
              />
              <TextInput
                style={{
                  height: 40,
                  flex: 1,
                  fontFamily: "Poppins",
                }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              ></TextInput>
            </View>
            <View style={styles.colorPickContainer}>
            <Text style={styles.colorPickTitle}>Choose Background Color:</Text>
            <View style={styles.colorOptionsContainer}>
              <View style={styles.colorOption1}></View>
              <View style={[styles.colorOption1, styles.colorOption2]}></View>
              <View style={[styles.colorOption1, styles.colorOption3]}></View>
              <View style={[styles.colorOption1, styles.colorOption4]}></View>
            </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                })
              }
            >
              <Text style={styles.button}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  startBox: {
    backgroundColor: "white",
    width: "88%",
    height: "44%",
    justifyContent: "space-around",
    margin: 30
  },
  colorOptionsContainer: {
    flexDirection: "row",
    width: "70%",
    
    justifyContent: "space-between",
  },
  colorOption1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#090C08",
  },
  colorOption2: {
    backgroundColor: "#474056",
  },
  colorOption3: {
    backgroundColor: "#8A95A5",
  },
  colorOption4: {
    backgroundColor: "#B9C6AE",
  },
  inputText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    margin: 20, 
  },
  Title: {
    fontFamily: "Poppins",
    color: "#ffffff",
    fontSize: 45,
    flex: 1,
    marginTop: 80,
  },
  button: {
    backgroundColor: "#474056",
    color: "white",
    width: "86%",
    alignSelf: "center",
    height: 50,
    margin: 10,
    fontSize: 20,
    padding: 10,
    fontFamily: "Poppins",
    textAlign: "center"
  },
  colorPickContainer:{
    marginLeft: 20
  }
});
