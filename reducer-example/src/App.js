import logo from "./logo.svg";
import "./App.css";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "BUY_CAR":
      return {
        ...state,
        numberOfCars: state.numberOfCars - action.payload.quantity,
      };

    case "SELL_CAR":
      return {
        ...state,
        numberOfCars: state.numberOfCars + action.payload.quantity,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    numberOfCars: 0,
  });

  return <div className="App"></div>;
}

export default App;
