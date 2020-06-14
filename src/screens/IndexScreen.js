import React, { useContext } from "react";
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
  border-bottom-width: 1;
  border-color: gray;
`;

const Name = styled.Text`
  font-size: 24px;
`;

const IndexScreen = ({ navigation, ...props }) => {
  const { state, addTimer, deleteTimer } = useContext(Context);
  return (
    <View>
      <Button title="Add timer" onPress={addTimer} />
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
                  {item.name} - {item.id}
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

export default IndexScreen;
