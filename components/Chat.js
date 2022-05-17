import React from "react";
import { View, Text, Button } from "react-native";

//chat component 
export default class Chat extends React.Component {

  //doesn't show up the name
  componentDidMount() {
    let { name } = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }
  render() {
    let { bg } = this.props.route.params;

    return (
      <View style={{ flex: 1, backgroundColor: bg, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="go to start"
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}
