import React from "react";
import { View, Text, Button } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

//chat component
export default class Chat extends React.Component {
  constructor() {
    super();
    //state initialization
    this.state = {
      messages: [],
    };
  }

  //doesn't show up the name
  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    });
  }
  render() {
    let { bg } = this.props.route.params;

    return (
      
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
   
    );
  }
}
