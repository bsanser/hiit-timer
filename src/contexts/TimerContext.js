import { ADD_TIMER, DELETE_TIMER, GET_TIMERS } from "../constants/actionTypes";
import createDataContext from "../contexts/createDataContext";
import AsyncStorage from "@react-native-community/async-storage";

const timerReducer = (state, action) => {
  switch (action.type) {
    case GET_TIMERS: {
      return action.payload;
    }
    case ADD_TIMER: {
      return [...state, action.payload];
    }

    case DELETE_TIMER: {
      return state.filter((timer) => timer.nameOfTimer !== action.payload);
    }
    default:
      return state;
  }
};

const getTimers = (dispatch) => {
  return async () => {
    let timers = [];
    const timerKeysSaved = await AsyncStorage.getAllKeys();
    for (let key of timerKeysSaved) {
      const timer = await AsyncStorage.getItem(key);
      timers.push(JSON.parse(timer));
    }
    dispatch({ type: GET_TIMERS, payload: timers });
  };
};

const addTimer = (dispatch) => {
  return async ({
    nameOfTimer,
    numberOfSets,
    numberOfExercises,
    hasWarmupPeriod,
    warmupPeriod,
    hasCooldownPeriod,
    cooldownPeriod,
    nameOfExercises,
    exerciseDuration,
    restBetweenExercises,
    restBetweenSets,
    timerStructure,
    totalDuration,
    callback,
  }) => {
    const newTimer = {
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
    };
    await AsyncStorage.setItem(
      `timer-${nameOfTimer}`,
      JSON.stringify(newTimer)
    );
    dispatch({ type: ADD_TIMER, payload: newTimer });

    if (callback) {
      callback();
    }
  };
};

const deleteTimer = (dispatch) => {
  return async (nameOfTimer) => {
    await AsyncStorage.removeItem(`timer-${nameOfTimer}`);
    dispatch({ type: DELETE_TIMER, payload: nameOfTimer });
  };
};

export const { Context, Provider } = createDataContext(
  timerReducer,
  {
    addTimer,
    deleteTimer,
    getTimers,
  },
  []
);
