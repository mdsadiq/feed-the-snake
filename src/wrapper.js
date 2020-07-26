import React, { useState } from "react";
import Game from "./game";
import { MODES } from "./constants";

function Wrapper() {
  const [mode, setMode] = useState(MODES.game);
  const toggleMode = () => {
    mode === MODES.dev ? setMode(MODES.game) : setMode(MODES.dev);
  };
  return (
    <div tabIndex="0" className="App" id="app">
      <div className="header-info">
        <h2>Feed the Snake</h2>
      </div>

      <Game toggleMode={toggleMode} mode={mode} />
      <div className="footer-info">
        <div>
          Mode: <span className="mode">{mode}</span>
        </div>
        <div />
      </div>
    </div>
  );
}

export default Wrapper;
