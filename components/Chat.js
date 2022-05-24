import React from "react";
import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useState, useEffect, useCallback } from "react";
//using db reference and auth
import { db} from "../firebase/firebase-config";
//import of asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    let isMounted = true;
    props.navigation.setOptions({ title: name });
    const messagesQuery = query(myReference, orderBy("createdAt", "desc"));
    // onSnapshot returns an unsubscriber, listening for updates to the messages collection
    //if user is logged in and their collection is empty (default, users are anonymous and can't log back in)
    const unsubscribeList = onSnapshot(messagesQuery, onCollectionUpdate);
    return () => {
      //unsubscribe to onSnapshot and auth
      isMounted = false;
      unsubscribeList();
    };
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

  ///need something to fix where the documents are beign added, and if no user is signed in then i want to only display documents that have no id
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
    addMessage(messages[0]);
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

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <GiftedChat
        renderBubble={renderBubble.bind(this)}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: name,
          avatar: 'https://placeimg.com/140/140/any'
        }}
      />
      {/**to fix keyboard issue on old models of android */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}
