import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Context } from "../contexts/TimerContext";

const ShowScreen = ({ navigation }) => {
  const nameOfTimer = navigation.getParam("nameOfTimer");
  const { state } = useContext(Context);
  const selectedTimer = state.find(
    (timer) => timer.nameOfTimer === nameOfTimer
  );
  console.log({ selectedTimer });
  return (
    <View>
      <Text>Name: {selectedTimer.nameOfTimer}</Text>
      <Text>Total duration: {selectedTimer.totalDuration}</Text>
    </View>
  );
};

export default ShowScreen;
