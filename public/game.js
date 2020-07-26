import React, { Component } from "react";
import Board from './components/board'

class Game extends Component {
  constructor() {
    super()
    this.state = {
      row: 10, column: 10,
      worm: [[0, 1], [0, 2], [0, 3]],
      food: [],
      block: []
    }
  }
  checkWalls = (pos) => {
    const { row, column } =this.state
    console.log(pos)
    if( pos[0] < 0 || pos[0] > row-1 || pos[1] < 0 || pos[1] > column-1) {
      alert('!!!!')
    }
  }

  resetFood = () => {
    let food = [genRandom(this.state.row), genRandom(this.state.column)]
    let isFoodInWorm = this.state.worm.some((w) => (w[0] == food[0] && w[1] == food[1]))

    // check if new food is present in worm's existing position
    if (isFoodInWorm) this.resetFood()
    else this.setState({ food })
  }


  componentDidMount() {
    this.resetFood()
  }
  moveRight = (worm) => {
    console.log('this.moveRight')
    const { food } = this.state
    const firstPos = worm[worm.length - 1] // remove the first element
    const computedPosition = add2Dimenson(firstPos, 0, 1)
    this.checkWalls(computedPosition)

    if (!(computedPosition[0] == food[0] && computedPosition[1] == food[1])) worm.shift(); //remove last element
    else this.resetFood()  // generate new food

    return [...worm, computedPosition]
  }


  moveDown = (worm) => {
    console.log('this.moveDown')
    const { food } = this.state
    const firstPos = worm[worm.length - 1]
    const computedPosition = add2Dimenson(firstPos, 1, 0)
    this.checkWalls(computedPosition)
    //if worm did not eat food
    if (!(computedPosition[0] == food[0] && computedPosition[1] == food[1])) worm.shift(); //remove last element
    else this.resetFood()  // generate new food

    return [...worm, add2Dimenson(firstPos, 1, 0)]
  }

  moveLeft = (worm) => {
    const { food } = this.state
    const firstPos = worm[worm.length - 1]
    const computedPosition = add2Dimenson(firstPos, 0, -1)
    this.checkWalls(computedPosition)
    //if worm did not eat food
    if (!(computedPosition[0] == food[0] && computedPosition[1] == food[1])) worm.shift(); //remove last element
    else this.resetFood()  // generate new food

    return [...worm, computedPosition]
  }

  moveUp = (worm) => {
    const { food } = this.state
    const firstPos = worm[worm.length - 1]
    const computedPosition = add2Dimenson(firstPos, -1, 0)
    this.checkWalls(computedPosition)
    //if worm did not eat food
    if (!(computedPosition[0] == food[0] && computedPosition[1] == food[1])) worm.shift(); //remove last element
    else this.resetFood()  // generate new food

    return [...worm, computedPosition]
  }



  handleKeyDown = (event) => {
    if (event.which === 39) {
      this.setState({ worm: this.moveRight(this.state.worm) })
    } else if (event.which === 40) {
      this.setState({ worm: this.moveDown(this.state.worm) })
    } else if (event.which === 38) {
      this.setState({ worm: this.moveUp(this.state.worm) })
    } else if (event.which === 37) {
      this.setState({ worm: this.moveLeft(this.state.worm) })
    } else { }
  }

  render() {
    const { row, column, worm, food, block } = this.state
    console.log(JSON.stringify(worm))
    return (
      <div>{food[0]}{food[1]}
        <div tabIndex="0" onKeyDown={this.handleKeyDown}>
          <Board
            row={row}
            column={column}
            worm={worm}
            food={food}
            block={block} />
        </div>
      </div>
    );
  }
}

export default Game

const add2Dimenson = (arr, addX = 0, addY = 0) => ([arr[0] + addX, arr[1] + addY])
const genRandom = (max) => {
  let n = Math.round(Math.random() * max)
  return n > 10 ? Math.round(Math.random() * max) : n
}
