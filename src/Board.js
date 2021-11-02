import { useContext, useEffect, useState, useCallback } from "react";
import { FoodContext, SnakeContext } from "./context";
import useMover from "./useMover";
import { genRandom } from "./utils/utils";

const getSnakeLoc = (pos, snake) => snake.findIndex((sPos) => sPos.loc === pos.loc);
const Board = ({ row, col }) => {
  const [ canPlay, setCanPlay ] = useState(true);
  const [ direction, setDirection ] = useState('ArrowRight');
  // const activePointRef = useRef(canPlay);

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
  const [snake, setSnake] = useContext(SnakeContext);

  const [action, setAction] = useState('');
  const [log, setLog] = useState([])

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
  const generateFood = () => {
    let newFood = { 
      row: genRandom(row),
      col: genRandom(col)
    }
    if(getSnakeLoc({ loc: `${newFood.row}_${newFood.col}` }, snake) > -1) return generateFood()
    else return newFood;
  }
  
  // movement effect
  useEffect(() => {
    const currentPos = snake[snake.length-1].loc.split("_")
    const calculateNewCoordinate = pressedKey[action.code];
    if(!calculateNewCoordinate){ return null }
    const newCoordinate = calculateNewCoordinate(currentPos);
    const isNextMoveWrong = snake.findIndex(pos => pos.loc === newCoordinate) > -1
    const didItHitWall = () => {
      const newCoordinateArray = newCoordinate.split('_')
      const rr = parseInt(newCoordinateArray[0], 10)
      const cc = parseInt(newCoordinateArray[1], 10)
      if(rr < 0 || rr > row-1 || cc < 0 || cc > col-1) return true;
      return false;
    }
    if(isNextMoveWrong) {
      console.log('ate it self', newCoordinate, snake)
      setCanPlay(false);
    }
    else if(didItHitWall()) {
      console.log('Hit wall', newCoordinate, snake)
      setCanPlay(false);
    } else {
      const newSnake = [ ...snake ]
      newSnake.push({loc: newCoordinate });
      const head = newSnake[newSnake.length-1].loc.split("_").map(l => parseInt(l,10))
      const didSnakeEatFood = head[0] === food.row && head[1] === food.col ? true : false;
      if(didSnakeEatFood){ 
        const newFood = generateFood()
        setFood(newFood)
        setLog(log => [  ...log, newFood ])
      } else {
        newSnake.shift();  
      }
      console.log(JSON.stringify(food));
      setSnake(newSnake);
    }
  },[action])

  const handleKeyPress = useCallback((e) => {  
    console.log(e.code, {canPlay}, action)
    if(e.code === "Space"){
      setCanPlay(true);
    }else if(canPlay) {
      if(["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(e.code)){
        // console.log(e.code, 'setting actuon', canPlay, action)
        setAction({ code: e.code, id: Math.random() })
        // setDirection(e.code);
      } else {
        // setAction({ code: direction, id: Math.random() })
      }
    }
  },[ canPlay, direction ])

  // const handleDirection = useCallback((e) => {  
  //     setDirection(e.code);
  // },[ canPlay ])

  // const sd = useCallback((e) => setDirection(e.code), []);
  const sd = (e) => setDirection(e.code) 
  useEffect(() => {    
    console.log('detected change, redeploying set direction ')
    window.addEventListener('keydown', sd);
    return () => {
      window.removeEventListener('keydown', sd);
    }
  }, [sd])

  useMover(()=> {
    // const customEvent = { code: direction || 'ArrowRight' }
    handleKeyPress({ code: direction })
  }, canPlay ? 400 : null);

  return (
    <div className="board">
      {boardunits.map((box) => {
        let unitType = "empty", snakeLoc;
        if (box.loc === `${food.row}_${food.col}`) {
          unitType = "food";
        } else {
          snakeLoc = getSnakeLoc(box, snake)
          if (snakeLoc > -1) unitType = "snake";
        }

        return <Base key={box.loc} unitType={unitType} val={box.loc} maxRow={row} data-row={row} data-col={col} isHead={snakeLoc === snake.length-1}/>;
      })}
      <div style={{ position: "absolute",background:"wheat", right: 0, bottom: 0, height: 100, overflowY: "scroll"}}>{JSON.stringify(log, null,2) }</div>
    </div>
  );
};
export default Board;

const Base = ({ unitType, val, maxRow, isHead }) => {
  const units = {
    food: "food",
    snake: "snake",
    empty: "empty",
  };
  return (
    <>
      <div className={`base-block ${units[unitType]}`} style={{ background: isHead ? 'palegreen' : '' }}></div>
      {val.split('_')[1] === maxRow-1 + '' ? <br /> : null}
    </>
  );
};
