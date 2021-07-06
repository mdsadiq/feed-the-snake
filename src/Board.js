import { useContext, useEffect, useState } from "react";
import { FoodContext } from "./context";

const isSnake = (pos, snake) => snake.some((sPos) => sPos.loc === pos.loc);
const Board = ({ row, col }) => {
  const [boardunits, setBoardunits] = useState([]);
  const [food, setFood] = useContext(FoodContext);
  const boardSize = row * col;
  const [snake, useSnake] = useState([{ loc: "0_0" },{ loc: "0_1" },{ loc: "0_2" }]);

  useEffect(() => {
    const boardList = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        boardList.push({ loc: `${r}_${c}`, unitType: "" });
      }
    }
    setBoardunits(boardList);
    return () => {};
  }, [""]);

  return (
    <div className="board">
      {boardunits.map((box) => {
        let unitType = "empty";
        console.log(box.loc, food)
        if (box.loc === `${food.row}_${food.col}`) {
          unitType = "food";
        } else if (isSnake(box, snake)) {
          unitType = "snake";
        }
        return <Base key={box.loc} unitType={unitType} val={box.loc} maxRow={row}/>;
      })}
    </div>
  );
};
export default Board;

const Base = ({ unitType, val, maxRow }) => {
  const units = {
    food: "food",
    snake: "snake",
    empty: "empty",
  };
  return (
    <>
      <div className={`base-block ${units[unitType]}`}></div>
      {val.split('_')[1] === maxRow-1 + '' ? <br /> : null}
    </>
  );
};
