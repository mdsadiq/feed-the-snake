import  config from '../config'
const defaultState = config.food.location

export default function foodReducers(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
