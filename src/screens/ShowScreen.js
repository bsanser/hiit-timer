import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Context } from "../contexts/TimerContext";

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state } = useContext(Context);
  const selectedTimer = state.find((timer) => timer.id === id);
  //console.log({ selectedTimer });
  return (
    <View>
      <Text>{selectedTimer.nameOfTimer}</Text>
      <Text>{selectedTimer.id}</Text>
    </View>
  );
};

export default ShowScreen;
