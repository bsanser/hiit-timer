import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Context } from "../contexts/TimerContext";
import { useTimer } from "../hooks/useTimer";
import Timer from "../components/Timer";

const ShowScreen = ({ navigation }) => {
  const selectedTimerName = navigation.getParam("nameOfTimer");
  const { state } = useContext(Context);
  const selectedTimer = state.find(
    (timer) => timer.nameOfTimer === selectedTimerName
  );
  const {
    nameOfTimer,
    numberOfSets,
    numberOfExercises,
    nameOfExercises,
    exerciseDuration,
    restBetweenExercises,
    restBetweenSets,
    hasWarmupPeriod,
    warmupPeriod,
    hasCooldownPeriod,
    cooldownPeriod,
    timerStructure,
    totalDuration,
  } = selectedTimer;

  const timer = useTimer(selectedTimer);
  return (
    <View>
      <Text>Name of the timer: {nameOfTimer}</Text>
      <Text>Current exercise: {timerStructure[timer.index].name}</Text>
      <Text>
        Next exercise:
        {timer.index === timerStructure.length - 1
          ? "done"
          : timerStructure[timer.index + 1].name}
      </Text>
      <Text>Total duration: {totalDuration}</Text>
      <Timer timeLeft={timer.timeLeft} />
      <Button title="Start timer" onPress={timer.onStartButtonClick} />
    </View>
  );
};

export default ShowScreen;
