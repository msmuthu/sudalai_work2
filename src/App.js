import React from 'react';
import './style.css';
import store from './store';
import {
  counter_increment,
  counter_decrement,
  randomNoAdd,
  randomNoRemove,
} from './constants';
import Test from './connectComponent';
import { Provider } from 'react-redux';
import store from './store';
import selectn from 'selectn';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  increment() {
    store.dispatch({ type: counter_increment });
    store.dispatch({ type: randomNoAdd });
  }

  decrement() {
    store.dispatch({ type: counter_decrement });
    store.dispatch({ type: randomNoRemove });
  }

  render() {
    let a = { sudalai: { age: 26 } };
    console.log(selectn(`sudalai.age.sdcsdc`, a), '1234567890');
    return (
      <Provider store={store}>
        <div>
          <Test />
          <div> {store.getState().count} </div>
          {/* <button onClick={this.increment}>Increment-App</button>{' '}
          <button onClick={this.decrement}>Decrement-App</button> */}
        </div>
      </Provider>
    );
  }
}

export default App;
