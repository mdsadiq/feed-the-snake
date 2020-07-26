import  config from '../config'

const moveRight = Symbol('MOVE_RIGHT')
const moveDown = Symbol('MOVE_DOWN')
const moveUp = Symbol('MOVE_UP')
const moveLeft = Symbol('MOVE_LEFT')

const defaultState = config.worm.location



export default function wormReducers(state = defaultState, action) {
  switch (action.type) {
    case moveRight:
    case moveDown:
    case moveUp:
    case moveLeft:
    default:
      return state;
  }
}
