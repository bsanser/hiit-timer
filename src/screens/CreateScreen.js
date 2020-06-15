import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";
import { Context } from "../contexts/TimerContext";

const Wrapper = styled.View`
  margin: 10px;
  padding: 4px;
`;

const Label = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 4px;
`;

const StyledInput = styled.TextInput`
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const CreateScreen = ({ navigation }) => {
  const [nameOfTimer, setNameOfTimer] = useState("");
  const [numberOfSets, setNumberOfSets] = useState("");
  const [numberOfExercises, setNumberOfExercises] = useState("");
  const [nameOfExercises, setNameOfExercises] = useState([]);
  const [exerciseDuration, setExerciseDuration] = useState("");
  const [restBetweenExercises, setRestBetweenExercises] = useState("");
  const [restBetweenSets, setRestBetweenSets] = useState("");
  const [hasWarmupPeriod, setHasWarmupPeriod] = useState(false);
  const [warmupPeriod, setWarmupPeriod] = useState("");
  const [hasCooldownPeriod, setHasCooldownPeriod] = useState(false);
  const [cooldownPeriod, setCooldownPeriod] = useState("");
  const { addTimer } = useContext(Context);
  return (
    <Wrapper>
      <Label>Name of timer</Label>
      <StyledInput
        value={nameOfTimer}
        onChangeText={(text) => setNameOfTimer(text)}
      ></StyledInput>
      <Label>Number of sets</Label>
      <StyledInput
        value={numberOfSets}
        keyboardType="number-pad"
        onChangeText={(text) => setNumberOfSets(text)}
      ></StyledInput>
      <Label>Number of Exercises</Label>
      <StyledInput
        value={numberOfExercises}
        keyboardType="number-pad"
        onChangeText={(text) => setNumberOfExercises(text)}
      ></StyledInput>
      <Button
        title="Add timer"
        onPress={() =>
          addTimer(nameOfTimer, numberOfSets, numberOfExercises, () => {
            navigation.navigate("Index");
          })
        }
      />
    </Wrapper>
  );
};

export default CreateScreen;
