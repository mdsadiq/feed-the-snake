import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import reducers from "./reducers";
import Game from "./game";
import "./styles.css";
const store = createStore(reducers);

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <h2>Feed the Snake</h2>
        <Game />
      </div>
    </ReduxProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
