import { ADD_TIMER, DELETE_TIMER } from "../constants/actionTypes";
import createDataContext from "../contexts/createDataContext";

const timerReducer = (state, action) => {
  switch (action.type) {
    case ADD_TIMER: {
      return [
        ...state,
        {
          nameOfTimer: action.payload.nameOfTimer,
          numberOfSets: action.payload.numberOfSets,
          numberOfExercises: action.payload.numberOfExercises,
          nameOfExercises: action.payload.nameOfExercises,
          exerciseDuration: action.payload.exerciseDuration,
          restBetweenExercises: action.payload.restBetweenExercises,
          restBetweenSets: action.payload.restBetweenSets,
          hasWarmupPeriod: action.payload.hasWarmupPeriod,
          warmupPeriod: action.payload.warmupPeriod,
          hasCooldownPeriod: action.payload.hasCooldownPeriod,
          cooldownPeriod: action.payload.cooldownPeriod,
          timerStructure: action.payload.timerStructure,
          totalDuration: action.payload.totalDuration,
        },
      ];
    }
    case DELETE_TIMER: {
      return state.filter((timer) => timer.nameOfTimer !== action.payload);
    }
    default:
      return state;
  }
};

const addTimer = (dispatch) => {
  return ({
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
    dispatch({
      type: ADD_TIMER,
      payload: {
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
      },
    });
    callback();
  };
};

const deleteTimer = (dispatch) => {
  return (nameOfTimer) => {
    dispatch({ type: DELETE_TIMER, payload: nameOfTimer });
  };
};

export const { Context, Provider } = createDataContext(
  timerReducer,
  {
    addTimer,
    deleteTimer,
  },
  []
);
