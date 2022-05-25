import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
//native component to allow text components to be clickable (and button)
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
//background image
import BgImg from "../assets/BackgroundImage.png";
//user icon
import SvgImg from "../assets/icon.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFonts } from "expo-font";
//using db reference and auth
import { Auth } from "../firebase/firebase-config";
import { signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";

//start component which requires to enter a name and allows to customise chat colors
export default function Start(props) {
  const [name, setName] = useState("");
  const [bg, setBg] = useState("");
  const [loggedUser, setLoggedUser] = useState([]);
  //loading the custom font
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    let isMounted = true;
    //track state changes
    //error when logging out?
    const unsubscribeAuth = onAuthStateChanged(Auth, (currentUser) => {
      console.log("called", currentUser);
      if (currentUser?.uid) {
        setLoggedUser(currentUser.uid);
      } else {
        onLogin();
      }
    });
    return () => {
      //unsubscribe to onSnapshot and auth
      isMounted = false;
      unsubscribeAuth();
    };
  }, []);

  //logs in any user anonymously
  const onLogin = async () => {
    try {
      //When a signed-out user uses an app feature that requires authentication with Firebase,
      //sign in the user anonymously
      const user = await signInAnonymously(Auth, loggedUser);
      console.log(loggedUser);
      props.navigation.navigate("Chat", {
        name: name,
        bg: bg,
        //trying to pass props to chat (user id)
        userId: loggedUser,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  //log out the user
  const logOut = async () => {
    try {
      await signOut(Auth);
      setLoggedUser(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  //reference for background colors
  let colors = {
    black: "#090C08",
    purple: "#474056",
    blue: "#8A95A5",
    green: "#B9C6AE",
  };

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={BgImg} style={styles.backgroundImg}>
        <Text style={styles.Title}>The chat App</Text>
        <KeyboardAwareScrollView
          behavior={"padding"}
          style={styles.startBox}
          contentContainerStyle={{
            justifyContent: "space-around",
            flexGrow: 1,
          }}
          scrollEnabled={true}
        >
          <View style={styles.inputText}>
            <SvgImg width={20} height={20} />
            <TextInput
              style={styles.textInput}
              onChangeText={(name) => setName(name)}
              value={name}
              placeholder="Your Name"
            ></TextInput>
          </View>
          <View style={styles.colorPickContainer}>
            <Text style={styles.colorPickTitle}>Choose Background Color:</Text>
            <View style={styles.colorOptionsContainer}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose black as chat background color"
                style={styles.colorOption1}
                onPress={() => setBg(colors.black)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose purple as chat background color"
                style={[styles.colorOption1, styles.colorOption2]}
                onPress={() => setBg(colors.purple)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose blue as chat background color"
                style={[styles.colorOption1, styles.colorOption3]}
                onPress={() => setBg(colors.blue)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Option to choose a chat background color"
                accessibilityHint="let's you choose green as chat background color"
                style={[styles.colorOption1, styles.colorOption4]}
                onPress={() => setBg(colors.green)}
              ></TouchableOpacity>
            </View>
          </View>
          {!loggedUser && (
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Start chatting button"
              accessibilityHint="let's you navigate to the chat screen"
              onPress={onLogin}
            >
              <Text style={styles.button}>Start Chatting</Text>
            </TouchableOpacity>
          )}
          {loggedUser && (
            <View>
              <TouchableOpacity
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Start chatting button"
                accessibilityHint="let's you navigate to the chat screen"
                onPress={onLogin}
              >
                <Text style={styles.button}>Back to chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="logout button"
                accessibilityHint="let's you logout (never come back)"
                onPress={logOut}
              >
                <Text style={styles.button}>Chat as new user</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
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
    padding: 5,
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
