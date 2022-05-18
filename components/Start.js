import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground
} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
//native component to allow text components to be clickable (and button)
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";
//background image
import BgImg from "../assets/BackgroundImage.png";
//user icon
import SvgImg from "../assets/icon.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//start component which requires to enter a name and allows to customise chat colors
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", fontsLoaded: false, bg: "", onClicked: false };
  }

  changeBg = (color) => {
    this.setState({ bg: color, onClicked: !this.state.onClicked });
  };
  colors = {
    black: "#090C08",
    purple: "#474056",
    blue: "#8A95A5",
    green: "#B9C6AE",
  };

 componentDidMount() {
     this.loadFonts()
  }

  async loadFonts() {
    await Font.loadAsync({
      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Poppins': {
        uri: require("../assets/fonts/Poppins-Light.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }


  render() {
    if(!this.state.fontsLoaded){
      return (<View />)
    }else{
    return (
      <View style={styles.container}>
        <ImageBackground source={BgImg} style={styles.backgroundImg}>
          <Text style={styles.Title}>The chat App</Text>
          <KeyboardAwareScrollView
          behavior={'padding'}
            style={styles.startBox}
            contentContainerStyle={{
              justifyContent: "space-around",
              flexGrow: 1
            }}
            scrollEnabled={true}
          >
            <View style={styles.inputText}>
              <SvgImg 
              width={20}
              height={20}/>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              ></TextInput>
            </View>
            <View style={styles.colorPickContainer}>
              <Text style={styles.colorPickTitle}>
                Choose Background Color:
              </Text>
              <View style={styles.colorOptionsContainer}>
                <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose black as chat background color"
                  style={
                    this.state.onClicked
                      ? styles.colorOption1
                      : styles.selectedColor
                  }
                  onPress={() => this.changeBg(this.colors.black)}
                ></TouchableOpacity>
                <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose purple as chat background color"
                  style={[styles.colorOption1, styles.colorOption2]}
                  onPress={() => this.changeBg(this.colors.purple)}
                ></TouchableOpacity>
                <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose blue as chat background color"
                  style={[styles.colorOption1, styles.colorOption3]}
                  onPress={() => this.changeBg(this.colors.blue)}
                ></TouchableOpacity>
                <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose green as chat background color"
                  style={[styles.colorOption1, styles.colorOption4]}
                  onPress={() => this.changeBg(this.colors.green)}
                ></TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Start chatting button"
            accessibilityHint="let's you navigate to the chat screen"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bg: this.state.bg,
                })
              }
            >
              <Text style={styles.button}>Start Chatting</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }}
}
const fontStack = {
  fontFamily: "Poppins",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startBox: {
    backgroundColor: "white",
    width: "88%",
    height: "30%",
    margin: 30,
  },
  colorOptionsContainer: {
    flexDirection: "row",
    width: "70%",
    marginTop: 20,
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    flex: 1,
    ...fontStack,
  },
  colorOption1: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
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
    padding: 5
  },
  Title: {
    ...fontStack,
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
    ...fontStack,
    textAlign: "center",
  },
  colorPickContainer: {
    marginLeft: 20,
  },
  selectedColor: {
    borderColor: "#00ff00",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#090C08",
  },
});
