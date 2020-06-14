import { ADD_TIMER, DELETE_TIMER } from "../constants/actionTypes";
import createDataContext from "../contexts/createDataContext";

const timerReducer = (state, action) => {
  switch (action.type) {
    case ADD_TIMER: {
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999), //refactor
          name: `Blog Post #${state.length + 1}`,
        },
      ];
    }
    case DELETE_TIMER: {
      return state.filter((timer) => timer.id !== action.payload);
    }
    default:
      return state;
  }
};

const addTimer = (dispatch) => {
  return () => {
    dispatch({ type: ADD_TIMER });
  };
};

const deleteTimer = (dispatch) => {
  return (id) => {
    dispatch({ type: DELETE_TIMER, payload: id });
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
