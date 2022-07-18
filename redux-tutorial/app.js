// ACTION TYPES
const BUY_CAR = "BUY_CAR";
const SELL_CAR = "SELL_CAR";

// ACTIONS
const buyCar = (quantity = 1) => {
  return {
    type: BUY_CAR,
    payload: {
      quantity,
    },
  };
};

const sellCar = (quantity = 1) => {
  return {
    type: SELL_CAR,
    payload: {
      quantity,
    },
  };
};

const initialState = {
  numberOfCars: 0,
};

const carsReducer = (state = initialState, action) => {
  //   console.log("reducer ran", state, action);

  switch (action.type) {
    case BUY_CAR:
      return {
        ...state,
        numberOfCars: state.numberOfCars - action.payload.quantity,
      };

    case SELL_CAR:
      return {
        ...state,
        numberOfCars: state.numberOfCars + action.payload.quantity,
      };
    default:
      return state;
  }
};

const { createStore } = require("redux");

const store = createStore(carsReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(buyCar(2));
store.dispatch(buyCar(2));
store.dispatch(buyCar(2));
store.dispatch(sellCar(2));
store.dispatch(sellCar(2));
store.dispatch(sellCar(2));
