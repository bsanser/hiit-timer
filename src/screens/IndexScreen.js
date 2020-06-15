import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

import { Context } from "../contexts/TimerContext";

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

const IndexScreen = ({ navigation, ...props }) => {
  const { state, deleteTimer } = useContext(Context);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(timer) => timer.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <TimerListItem>
                <Name>
                  {item.nameOfTimer} - {item.id}
                </Name>
                <TouchableOpacity onPress={() => deleteTimer(item.id)}>
                  <FontAwesome name="trash-o" size={32} color="black" />
                </TouchableOpacity>
              </TimerListItem>
            </TouchableOpacity>
          );
        }}
      />
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
