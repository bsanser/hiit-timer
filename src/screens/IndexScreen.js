import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { Context } from "../contexts/TimerContext";

const IndexScreen = () => {
  const { state, addTimer } = useContext(Context);
  return (
    <View>
      <Text>Index Screen</Text>
      <Button title="Add timer" onPress={addTimer} />
      <FlatList
        data={state}
        keyExtractor={(timer) => timer.name}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

export default IndexScreen;
