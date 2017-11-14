import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const initialState = {
  authed: false
};

export const actionTypes = {
  TOGGLEAUTH: "TOGGLEAUTH"
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLEAUTH:
      return Object.assign({}, state, { authed: action.payload });
    default:
      return state;
  }
};

export const toggleAuth = payload => dispatch =>
  dispatch({ type: actionTypes.TOGGLEAUTH, payload });

export const makeStore = initialState =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
