import { useContext, useEffect, useState } from "react";
import { FoodContext } from "./context";

const isSnake = (pos, snake) => snake.some((sPos) => sPos.loc === pos.loc);
const Board = ({ row, col }) => {
  const [boardunits, setBoardunits] = useState([]);
  const [food, setFood] = useContext(FoodContext);
  const boardSize = row * col;
  const [action, setAction] = useState('');
  const def = [{ loc: "0_0" },{ loc: "0_1" },{ loc: "0_2" }]
  const [snake, setSnake] = useState(def);

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
  
  const pressedKey = {
    "ArrowRight": (pos)=> { 
        const next = parseInt(pos[1], 10) + 1;
        return `${pos[0]}_${next}`
    },
    "ArrowLeft": (pos)=> { 
      const next = parseInt(pos[1], 10) - 1;
      return `${pos[0]}_${next}`
    },
    "ArrowUp": (pos)=> { 
      const next = parseInt(pos[0], 10) - 1;
      return `${next}_${pos[1]}`
    },
    "ArrowDown": (pos)=> { 
      const next = parseInt(pos[0], 10) + 1;
      return `${next}_${pos[1]}`
    }
    
  }
  
  // movement effect
  useEffect(() => {  
    const currentPos = snake[snake.length-1].loc.split("_")
    const calculateNewCoordinate = pressedKey[action.key];
    if(!calculateNewCoordinate){ return null }
    const newCoordinate = calculateNewCoordinate(currentPos);
    const newSnake = [ ...snake ]
    newSnake.push({loc: newCoordinate });
    newSnake.shift();
    console.log(JSON.stringify(snake), JSON.stringify(newSnake));
    setSnake(newSnake);
  },[action])

 
  useEffect((e) => {
    const handleKeyPress = (e) => { 
      setAction({ key: e.key, id: Math.random() })
    };
    window.addEventListener('keydown', handleKeyPress)
    // return () => {
    //   {};
    // }
  }, [])

  return (
    <div className="board">
      {boardunits.map((box) => {
        let unitType = "empty";
        if (box.loc === `${food.row}_${food.col}`) {
          unitType = "food";
        } else if (isSnake(box, snake)) {
          unitType = "snake";
        }
        return <Base key={box.loc} unitType={unitType} val={box.loc} maxRow={row} data-row={row} data-col={col}/>;
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
      <div className={`base-block ${units[unitType]}`} style={{ fontSize: 8 }}></div>
      {val.split('_')[1] === maxRow-1 + '' ? <br /> : null}
    </>
  );
};
