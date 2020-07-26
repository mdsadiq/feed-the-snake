import { combineReducers } from "redux";
import board from "./boardReducer"
import wormReducer from "./wormReducer"
import foodReducer from "./foodReducer"

export default combineReducers({
  board,
  worm: wormReducer,
  food: foodReducer
});
