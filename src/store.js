import * as redux from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger, { createLogger } from 'redux-logger';
import {
  counter_increment,
  counter_decrement,
  randomNoAdd,
  randomNoRemove,
} from './constants';

let defaultState = {
  count: 0,
};

export const countReducer = (state = defaultState, action) => {
  switch (action.type) {
    case counter_decrement: {
      if (state.count <= 0) {
        return { ...state, count: state.count };
      }
      return { ...state, count: state.count - 1 };
      break;
    }
    case counter_increment: {
      return { ...state, count: state.count + 1 };
      break;
    }
    default: {
      return state;
    }
  }
};

export const randomNoGenerate = (state = [], action) => {
  switch (action.type) {
    case randomNoAdd: {
      if (state.indexOf('All No Removed') == 0) {
        state.splice(0, 1);
      }
      let data = [...state];
      data.push(Math.random());
      return [...data];
      break;
    }
    case randomNoRemove: {
      let data = [...state];
      data.pop();
      if (!data.length) {
        data = ['All No Removed'];
      }
      return [...data];
      break;
    }
    default: {
      return state;
    }
  }
};

let combineReducer = combineReducers({ randomNoGenerate, countReducer });
// const combineReducer = (state = {}, action) => {
//   return {
//     counter: countReducer(state.count, action),
//     randomNo: randomNoGenerate(state.data, action),
//   };
// };

/*create custom middleware*/
function MyMiddleware(store) {
  return (next) => {
    //console.log(next, 'next');
    return (action) => {
      // console.log(action, 'action123');
      return next(action);
    };
  };
}

function customLogger() {
  createLogger({
    collapsed: false,
    colors: {
      title: () => 'inherit',
      prevState: () => '#ff7c67',
      action: () => '#03A9F4',
      nextState: () => '#4CAF50',
      error: () => '#F20404',
    },
  });
}

const store = redux.createStore(
  combineReducer /* Total reducer function combined */,
  {
    countReducer: { count: 45, sudalai: 27 },
  } /*The initial state.*/,
  applyMiddleware(thunk, MyMiddleware, logger) /* apply MyMiddleware */
);

export default store;
