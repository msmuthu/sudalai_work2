import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  counter_increment,
  counter_decrement,
  randomNoAdd,
  randomNoRemove,
} from './constants';
import { incrementDispatch, decrementDispatch } from './dispatchMethods';
import selectn from 'selectn';
import style from './style.css';

function Test(props) {
  let { increment, decrement, count, randomNoGenerate } = props;

  return (
    <div>
      {'Hello React ' + count}
      <br />
      <br />
      {randomNoGenerate.map((value) => {
        return <div>{value}</div>;
      })}
      <button onClick={increment}>Increment</button>{' '}
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

function mapStateToProps(state) {
  let { countReducer, randomNoGenerate } = state;
  return {
    count: countReducer.count,
    randomNoGenerate,
  };
}

function handleIncrement() {
  return (dispatch, getState) => {
    dispatch({ type: counter_increment });
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => {
      return dispatch(handleIncrement());
    },
    decrement: () => {
      return dispatch({ type: counter_decrement });
    },
  };
}

export default connect(mapStateToProps, {
  increment: incrementDispatch,
  decrement: decrementDispatch,
})(Test);

// bindActionCreators('actionMethod','dispatchMethod')

// export default connect(mapStateToProps, mapDispatchToProps)(Test);
