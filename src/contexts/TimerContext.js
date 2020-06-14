import React, { useReducer } from "react";
import { ADD_TIMER } from "../constants/actionTypes";
import createDataContext from "../contexts/createDataContext";

const timerReducer = (state, action) => {
  switch (action.type) {
    case ADD_TIMER: {
      return [...state, { name: `Blog Post #${state.length + 1}` }];
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

export const { Context, Provider } = createDataContext(
  timerReducer,
  {
    addTimer,
  },
  []
);
