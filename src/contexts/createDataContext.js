import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addTimer: (dispatch) => return() =>{}}
    // loop through the actions object (second parameter of the context function) and for every key we are going to take its value (a function) and call it with the dispatch argument. Whatever that function returns is what we will pass down to into the value prop of the provider

    const boundActions = {}; // the "bound" is because they're bound to the value of dispatch

    for (let action in actions) {
      boundActions[action] = actions[action](dispatch)
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
