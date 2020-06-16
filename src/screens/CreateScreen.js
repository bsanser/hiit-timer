import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Switch, FlatList } from "react-native";
import styled from "styled-components";
import { Context } from "../contexts/TimerContext";
import COLORS from "../styles/colors";
import { generateTimerStructure, getTotalDuration } from "../utils/timerUtils";

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
  border: 1px solid #777;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 200px;
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

  const handleChange = (e, name) => {
    const text = e.nativeEvent.text;
    if (name === "numberOfExercises") {
      setNumberOfExercises(text);
      setNameOfExercises([...Array(+text).fill("", 0)]);
    }

    if (name !== "exerciseDuration" && name.includes("exercise")) {
      const exerciseNumber = name.split("-").pop();
      const newNameOfExercises = nameOfExercises.slice();
      newNameOfExercises[exerciseNumber] = text;
      setNameOfExercises(newNameOfExercises);
    }
  };

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
        onChange={(e) => handleChange(e, `numberOfExercises`)}
      ></StyledInput>
      {numberOfExercises.length > 0 && (
        <>
          <Label>Name of Exercises</Label>
          <FlatList
            data={[...Array(+numberOfExercises)]}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <StyledInput
                value={nameOfExercises[index]}
                onChange={(e) => handleChange(e, `exercise-${index}`)}
              ></StyledInput>
            )}
          />
        </>
      )}
      <Label>Exercise Duration</Label>
      <StyledInput
        value={exerciseDuration}
        keyboardType="number-pad"
        onChangeText={(text) => setExerciseDuration(text)}
      ></StyledInput>
      <Label>Rest between exercises</Label>
      <StyledInput
        value={restBetweenExercises}
        keyboardType="number-pad"
        onChangeText={(text) => setRestBetweenExercises(text)}
      ></StyledInput>
      <Label>Rest between sets</Label>
      <StyledInput
        value={restBetweenSets}
        keyboardType="number-pad"
        onChangeText={(text) => setRestBetweenSets(text)}
      ></StyledInput>

      <Label>Warmup period</Label>
      <Switch
        trackColor={{ false: COLORS.primary, true: "#81b0ff" }}
        thumbColor={hasWarmupPeriod ? COLORS.primary : "#f4f3f4"}
        ios_backgroundColor="#81b0ff"
        onValueChange={() => setHasWarmupPeriod((prevValue) => !prevValue)}
        value={hasWarmupPeriod}
      />
      {hasWarmupPeriod && (
        <>
          <StyledInput
            value={warmupPeriod}
            keyboardType="number-pad"
            onChangeText={(text) => setWarmupPeriod(text)}
          ></StyledInput>
        </>
      )}
      <Label>Cooldown period</Label>
      <Switch
        trackColor={{ false: COLORS.primary, true: "#81b0ff" }}
        thumbColor={hasCooldownPeriod ? COLORS.primary : "#f4f3f4"}
        ios_backgroundColor="#81b0ff"
        onValueChange={() => setHasCooldownPeriod((prevValue) => !prevValue)}
        value={hasCooldownPeriod}
      />
      {hasCooldownPeriod && (
        <>
          <StyledInput
            value={cooldownPeriod}
            keyboardType="number-pad"
            onChangeText={(text) => setCooldownPeriod(text)}
          ></StyledInput>
        </>
      )}
      <Button
        title="Add timer"
        onPress={() => {
          const timerStructure = generateTimerStructure({
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
          });
          const totalDuration = getTotalDuration(timerStructure);
          addTimer({
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
            callback: () => {
              navigation.navigate("Index");
            },
          });
        }}
      />
    </Wrapper>
  );
};

export default CreateScreen;
