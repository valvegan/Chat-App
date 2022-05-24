import React from "react";
import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect, useCallback } from "react";
//using db reference and auth
import { db } from "../firebase/firebase-config";
//import of asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";
//import of netinfo
import NetInfo from "@react-native-community/netinfo";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

//chat component
export default function Chat(props) {
  //retrieving props
  let { name, bg, userId } = props.route.params;

  //reference to the database
  const myReference = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  //connection state
  const [onlineState, setOnlineState] = useState();

  //save new messages locally via asyncstorage
  //setItem() is used both to add new data item (when no data for given key exists), and to modify existing item (when previous data for given key exists).
  const saveMessages = async (value) => {
    let messages = "";
    try {
      messages = JSON.stringify(value);
      await AsyncStorage.setItem("messages", messages);
      console.log("message saved in asyncstorage");
      console.log(await AsyncStorage.getItem("messages"));
    } catch (e) {
      // saving error
      console.log(error);
    }
  };

  //getMessages function to asynchronously retrieve messages from asyncstorage
  //reading data
  //getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
  const getMessages = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("messages");
      //error when setting the messages state
      setMessages(JSON.parse(jsonValue));
      console.log(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
      console.log(error);
    }
  };

  //async function to delete messages stored in asyncstorage
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    props.navigation.setOptions({ title: name });

    //using netInfo to find out the user's connection status, and fetching messages from asyncstorage if they are offline (and from firestore if they are online)
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        const messagesQuery = query(myReference, orderBy("createdAt", "desc"));
        //set the connection state to online
        setOnlineState(true);
        console.log("online");
        // onSnapshot returns an unsubscriber, listening for updates to the messages collection
        //if user is logged in and their collection is empty (default, users are anonymous and can't log back in)
        const unsubscribeList = onSnapshot(messagesQuery, onCollectionUpdate);
        // Delete previously saved messages in asyncStorage
        //deleteMessages();
        // Save messages to asyncStorage
        saveMessages();
        return () => {
          //unsubscribe to onSnapshot and auth
          isMounted = false;
          unsubscribeList();
        };
      } else {
        console.log("offline");
        //set the connection state to online
        setOnlineState(false);
        getMessages();
      }
    });
  }, []);

  const onCollectionUpdate = (snap) => {
    //setting the list
    setMessages(
      snap.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }))
    );
  };

  const addMessage = (message) => {
    addDoc(myReference, {
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
    })
      .then(() => {
        console.log("Doc created");
      })
      .catch((e) => console.log(e.message));
  };

  // Create custom onSend function, appending the newly created message to the messages state,
  // then calling addMessage to add to Firestore
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    saveMessages(messages[0]);
  }, []);

  /**  //this will allow to send new messages
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  } */

  //this will allow to change the message bubble color
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
        textProps={{
          style: {
            color: props.position === "left" ? "#000" : "#fff",
          },
        }}
      />
    );
  };

  //gifted chat feature - do not show the input box when the user is offline (so that they can't try to send messages offline)
  const renderInputToolbar = (props) => {
    if (!onlineState) {
      //hide toolbar
    } else {
      //display input box / toolbar
      return <InputToolbar {...props} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        renderInputToolbar={renderInputToolbar.bind()}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showAvatarForEveryMessage={true}
        user={{
          _id: userId,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        }}
      />
      {/**to fix keyboard issue on old models of android */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}
