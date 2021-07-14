import { useState } from "react";
import Board from "./Board";
import { FoodContext, SnakeContext } from "./context";

function Game({ mode, toggleMode }) {
  const babySnake = [{ loc: "0_0" },{ loc: "0_1" },{ loc: "0_2" },{ loc: "0_3" },{ loc: "0_4" },{ loc: "0_5" }]
  const [snake, setSnake] = useState(babySnake);
  const [size, setSize] = useState({ row: 12, col: 12 });
  const [food, setFood] = useState({ row: 2, col: 3 });

  const { row, col } = size;

  const startGame = () => {};
  const stopGame = () => {};
  const restartGame = () => {};

  return (
    <div
      className="game-container"
      tabIndex="0"
      // onKeyDown={this.handleKeyDown}
      // ref={this.gameBoard}
    >
      <div className="game-heading">
        Score :{snake.length - 6}
        <span className="game-notif">
          <b>Hit the wall</b>
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
          <SnakeContext.Provider value={[snake, setSnake]}>
            <Board row={row} col={col} />
          </SnakeContext.Provider>
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
