import React from "react";
import { Text } from "react-native";

import { zeroPad } from "../utils/timerUtils";

const Timer = ({ timeLeft }) => <Text>00:{zeroPad(timeLeft)}</Text>;

export default Timer;
