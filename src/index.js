import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import reducers from "./reducers";
import Wrapper from "./wrapper";
import "./styles.css";
const store = createStore(reducers);

function App() {
  return (
    <ReduxProvider store={store}>
      <Wrapper />
    </ReduxProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
