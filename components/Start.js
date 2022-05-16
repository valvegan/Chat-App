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
import userIcon from "./userIcon";

//importing fonts
let customFonts = {
  Poppins: require("../assets/fonts/Poppins-Black.ttf"),
  "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
};
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
        uri: require("../assets/fonts/Poppins-Black.ttf"),
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
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins",
              padding: 50,
              fontSize: 40,
            }}
          >
            The chat App
          </Text>

          <View style={{ backgroundColor: "white", padding: 10 }}>
            <View>
              <Svg width="50" height="50" viewBox="0 0 20 19">
                <Defs>
                  <Path
                    d="M12 13.253c3.24 0 9.6 1.577 9.6 4.852v2.426H2.4v-2.426c0-3.275 6.36-4.852 9.6-4.852zm8.64 6.318v-1.466c0-2.014-4.663-3.892-8.64-3.892-3.977 0-8.64 1.878-8.64 3.892v1.466h17.28zM12 11.36c-2.376 0-4.32-1.917-4.32-4.26S9.624 2.84 12 2.84c2.376 0 4.32 1.917 4.32 4.26s-1.944 4.26-4.32 4.26zm0-.96c1.849 0 3.36-1.49 3.36-3.3 0-1.81-1.511-3.3-3.36-3.3S8.64 5.29 8.64 7.1c0 1.81 1.511 3.3 3.36 3.3z"
                    id="a"
                  />
                </Defs>
                <G
                  transform="translate(-58 -389) translate(24 355) translate(16 16) translate(16 16)"
                  stroke="none"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                >
                  <Path d="M0 0H24V23.6666667H0z" />
                  <Mask fill="#fff">
                    <Use xlinkHref="#a" />
                  </Mask>
                  <Use fill="#757083" fillRule="nonzero" xlinkHref="#a" />
                </G>
              </Svg>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  backgroundColor: "white",
                  fontFamily: "Poppins",
                }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              ></TextInput>
            </View>
            <View style={styles.colorOptionsContainer}>
              <View
                style={{
                  backgroundColor: "#090C08",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#474056",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#8A95A5",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#B9C6AE",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              ></View>
            </View>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                })
              }
            >
              <Text
                style={{
                  backgroundColor: "#474056",
                  color: "white",
                  padding: 11,
                }}
              >
                Start Chatting
              </Text>
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
  colorOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
