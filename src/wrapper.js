import React, { useState } from "react";
import Game from "./game";
import { MODES } from "./constants";
import { mobileCheck } from "./utils/utils";

function Wrapper() {
  const [mode, setMode] = useState(MODES.dev);
  const toggleMode = () => {
    mode === MODES.dev ? setMode(MODES.game) : setMode(MODES.dev);
  };

  return (
    <div className="App" id="app">
      {mobileCheck() && (
        <div className="mobile-error">
          Cannot play on mobile.
          <br />
          Try opening it in system.
          <br />
        </div>
      )}
      {/* header */}
      <div className="header-info">
        <h2>Feed the Snake[wip]</h2>
        <h6>mdsadiq</h6>
      </div>
      {/* game */}
      <Game toggleMode={toggleMode} mode={mode} />
      {/* footer */}
      <div className="footer-info">
        <div>
          Mode:
          <button className="mode" onClick={toggleMode}>
            {mode}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
