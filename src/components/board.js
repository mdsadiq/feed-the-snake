import React, { Component } from "react";
import PropTypes from "prop-types";

import Base from "./base";

class Board extends Component {
  renderBoard = (row = 5, column = 5, worm, food, block, mode) => {
    const boardArray = [];
    // const worm = [].indexof
    // looping through for row
    for (let i = 0; i < row; i++) {
      const boarddiv = [];
      for (let j = 0; j < column; j++) {
        let item = undefined;

        //fing positions of food worm & block
        if (worm.some(w => w[0] === i && w[1] === j)) item = "worm";
        else if (block.some(w => w[0] === i && w[1] === j)) item = "block";
        else if (food[0] === i && food[1] === j) item = "food";

        boarddiv.push(
          <Base key={`${i}${j}`} posX={i} posY={j} item={item} mode={mode} />
        );
      }
      // to go to next row after the column limit is reached (ie) to create new rows
      boardArray.push(
        <div key={`d${i}`} style={{ marginBottom: "-5px" }}>
          {boarddiv}
        </div>
      );
    }
    return boardArray;
  };
  render() {
    const { row, column, worm, food, block, mode } = this.props;
    return <div>{this.renderBoard(row, column, worm, food, block, mode)}</div>;
  }
}

Board.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  worm: PropTypes.array.isRequired,
  food: PropTypes.array.isRequired,
  block: PropTypes.array.isRequired
};

export default Board;
