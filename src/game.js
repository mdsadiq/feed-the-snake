import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import Board from "./components/board";
import config from "./config";
import { add2Dimension, genRandom } from "./utils/utils";
import { MODES } from "./constants";

const initWorm = config.worm.location;

class Game extends Component {
  constructor() {
    super();
    this.gameBoard = createRef();
    this.refreshRate = null;
    this.state = {
      row: config.board.row,
      column: config.board.column,
      worm: initWorm.slice(),
      food: [],
      block: [],
      lastAction: "moveRight",
      dir: "right",
      speed: 600,
      failReason: ""
    };
  }

  //check conditions of fail
  checkGameConditions = pos => {
    const { row, column, worm } = this.state;
    console.log("pos->", pos, worm);
    //check the wall
    if (pos[0] < 0 || pos[0] > row - 1 || pos[1] < 0 || pos[1] > column - 1) {
      this.setState({ failReason: "hit the wall" });
      this.stopGame();
    }
    //check if worm is hitting itself
    const overlap = worm.filter(w => w[0] === pos[0] && w[1] === pos[1]);
    console.log("overlap->", overlap, this.refreshRate);
    if (overlap.length > 0) {
      this.setState({ failReason: "hit itself" });

      this.stopGame();
    }
  };

  resetFood = () => {
    const { row, column, worm, speed } = this.state;
    let food = [genRandom(row), genRandom(column)];
    let isFoodInWorm = worm.some(w => w[0] === food[0] && w[1] === food[1]);

    // check if new food is present in worm's existing position
    if (isFoodInWorm) this.resetFood();
    else this.setState({ food });
    //TODO reduce speed methodically ie 200, 100 75 50 25
    if (worm.length % 4 === 0) this.setState({ speed: speed - 100 });
  };

  startGame = direction => {
    let { worm, dir, speed } = this.state;
    this.setState(this.move(direction || dir, worm));
    const self = this;
    this.refreshRate = setInterval(function() {
      self.setState(self.move(direction || dir, worm));
    }, speed);
    // console.log("this.refreshRate", this.refreshRate);
  };

  stopGame = () => {
    console.log("this.refreshRate->", this.refreshRate);
    clearInterval(this.refreshRate);
  };

  restartGame = () => {
    this.stopGame();
    // console.log("restart", initWorm, this.refreshRate);
    //send the new config when starting
    this.setState({
      failReason: "",
      dir: "right",
      speed: 1000,
      worm: initWorm.slice()
    });
    setTimeout(this.startGame, 800);
  };

  checkMode = () => {
    if (this.props.mode === MODES.game) this.gameBoard.current.focus();
  };
  componentDidMount() {
    this.resetFood();
    // this.props.mode === MODES.game ? this.gameBoard.current.focus() : null
    this.checkMode();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.stopGame();
  }

  move = dir => {
    const { food, worm } = this.state;
    const firstPos = worm[worm.length - 1]; // remove the first element
    let computedPosition;
    if (dir === "right") computedPosition = add2Dimension(firstPos, 0, 1);
    else if (dir === "left") computedPosition = add2Dimension(firstPos, 0, -1);
    else if (dir === "down") computedPosition = add2Dimension(firstPos, 1, 0);
    else computedPosition = add2Dimension(firstPos, -1, 0);
    this.checkGameConditions(computedPosition);
    console.log("move->", dir);
    if (!(computedPosition[0] === food[0] && computedPosition[1] === food[1])) {
      worm.shift(); //remove last element
    } else this.resetFood(); // generate new food
    // this.setState({ worm: [...worm, computedPosition] });
    const newWorm = [...worm, computedPosition];
    return { dir, worm: newWorm };
  };

  handleKeyDown = event => {
    this.stopGame();
    if (event.which === 39) {
      this.startGame("right");
    } else if (event.which === 40) {
      this.startGame("down");
    } else if (event.which === 38) {
      this.startGame("up");
    } else if (event.which === 37) {
      this.startGame("left");
    }
    // this.move(this.state.worm);
  };
  // component;
  render() {
    const { row, column, worm, food, block, failReason } = this.state;
    const { toggleMode } = this.props;
    return (
      <div
        className="game"
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        ref={this.gameBoard}
      >
        <div>
          Score: {worm.length - 3} &nbsp;
          <b>{failReason}</b>
          <button onClick={this.stopGame}>Stop</button>
          <button onClick={this.startGame}>Start</button>
          <button onClick={this.restartGame}>Restart</button>
          <button onClick={toggleMode}>Toggle mode</button>
        </div>
        <Board
          row={row}
          column={column}
          worm={worm}
          food={food}
          block={block}
        />
      </div>
    );
  }
}

Game.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  mode: PropTypes.string
};

export default Game;
