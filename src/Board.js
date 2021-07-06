import { useContext, useEffect, useMemo, useState } from "react";
import { FoodContext } from "./context";

const isSnake = (pos, snake) => snake.some((sPos) => sPos.loc === pos.loc);
const Board = ({ row, col }) => {
  
  const createBoard = () => {
    const boardList = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        boardList.push({ loc: `${r}_${c}`, unitType: "" });
      }
    }
    return boardList
  }
  const [boardunits, setBoardunits] = useState(createBoard);
  const [food, setFood] = useContext(FoodContext);
  const boardSize = row * col;
  const [action, setAction] = useState('');
  const def = [{ loc: "0_0" },{ loc: "0_1" },{ loc: "0_2" }]
  const [snake, setSnake] = useState(def);
  const [log, setLog] = useState([])
  // useEffect(() => {
  //   const boardList = [];
  //   for (let r = 0; r < row; r++) {
  //     for (let c = 0; c < col; c++) {
  //       boardList.push({ loc: `${r}_${c}`, unitType: "" });
  //     }
  //   }
  //   setBoardunits(boardList);
  // //   // return () => {};
  // }, [""]);
  // const boardunits = useMemo(() => {
  //   const boardList = [];
  //   for (let r = 0; r < row; r++) {
  //     for (let c = 0; c < col; c++) {
  //       boardList.push({ loc: `${r}_${c}`, unitType: "" });
  //     }
  //   }
  // }, [row, col])
  
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
    
    console.log(newSnake)
    const head = newSnake[newSnake.length-1].loc.split("_").map(l => parseInt(l,10))
    const didSnakeEatFood = head[0] === food.row && head[1] === food.col ? true : false;
    if(didSnakeEatFood){ 
      const newFood = { row: Math.round(Math.random()*row-1), col: Math.round(Math.random()*col-1) }
      setFood(newFood)
      setLog(log => [  ...log, newFood ])
    }else{
      newSnake.shift();  
    }
    console.log(JSON.stringify(snake), JSON.stringify(newSnake), JSON.stringify(food));
    setSnake(newSnake);
    // setFood({ row: 5, col: 1 })
  },[action])

  const handleKeyPress = (e) => { 
    setAction({ key: e.key, id: Math.random() })
  };
  
  useEffect((e) => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
  // const renderBoard = function() {
  //   return boardunits.map((box) => {
  //     let unitType = "empty";
  //     if (box.loc === `${food.row}_${food.col}`) {
  //       unitType = "food";
  //     } else if (isSnake(box, snake)) {
  //       unitType = "snake";
  //     }
  //     return <Base key={box.loc} unitType={unitType} val={box.loc} maxRow={row} data-row={row} data-col={col}/>;
  //   })
  // }
  // const memoizedBoard = useMemo(renderBoard, boardunits)
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
      <div style={{ position: "absolute",background:"wheat", right: 0, bottom: 0, height: 100, overflowY: "scroll"}}>{JSON.stringify(log, null,2) }</div>
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
