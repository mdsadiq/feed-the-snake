import { useState } from "react";
// import Board from "./components/board";
import Board from "./Board";
import { FoodContext } from "./context";

function Game({ mode, toggleMode }) {
  const [worm, setWorm] = useState([]);
  const [size, setSize] = useState({ row: 12, col: 12 });
  const [food, setFood] = useState({ row: 2, col: 3 });

  const { row, col } = size;

  const startGame = () => {};
  const stopGame = () => {};
  const restartGame = () => {};
  // const stopGame = () => {};

  return (
    <div
      className="game-container"
      tabIndex="0"
      // onKeyDown={this.handleKeyDown}
      // ref={this.gameBoard}
    >
      <div className="game-heading">
        Score :{worm.length - 3}
        <span className="game-notif">
          {" "}
          <b>Hit the wall</b>{" "}
        </span>
      </div>

      <div className="game">
        <div>
          <button onClick={stopGame}>Stop</button>
          <button onClick={startGame}>Start</button>
          <button onClick={restartGame}>Restart</button>
          <button onClick={toggleMode}>Toggle mode</button>
        </div>
        <FoodContext.Provider value={[ food, setFood ]} >
          <Board row={row} col={col} />
        </FoodContext.Provider>
        {/* <Board
            row={row}
            column={column}
            worm={worm}
            food={food}
            block={block}
          /> */}
      </div>
    </div>
  );
}

export default Game;
