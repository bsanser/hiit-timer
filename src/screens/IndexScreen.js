import React, { useContext, useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

import { Context } from "../contexts/TimerContext";
import { getMinutesAndSeconds } from "../utils/timerUtils";

const TimerListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom-width: 1px;
  border-color: gray;
`;

const Name = styled.Text`
  font-size: 24px;
`;

const DurationWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IndexScreen = ({ navigation, ...props }) => {
  const { state, getTimers, deleteTimer } = useContext(Context);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getTimers();
    setLoading(false);
  }, []);

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && state.length > 0 ? (
        <FlatList
          data={state}
          keyExtractor={(timer) => timer.nameOfTimer}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Show", { nameOfTimer: item.nameOfTimer })
                }
              >
                <TimerListItem>
                  <Name>{item.nameOfTimer}</Name>
                  <DurationWrapper>
                    <MaterialIcons name="timer" size={24} color="black" />
                    <Text>
                      {getMinutesAndSeconds(item.totalDuration).minutes}min{" "}
                      {getMinutesAndSeconds(item.totalDuration).seconds}secs{" "}
                    </Text>
                  </DurationWrapper>
                  <TouchableOpacity
                    onPress={() => deleteTimer(item.nameOfTimer)}
                  >
                    <FontAwesome name="trash-o" size={32} color="black" />
                  </TouchableOpacity>
                </TimerListItem>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text>You have not created any timers yet</Text>
      )}
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus-circle" size={36} color="white" />
      </TouchableOpacity>
    ),
    headerTintColor: "#fff",
  };
};

export default IndexScreen;
