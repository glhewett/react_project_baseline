import React from 'react';

import {
  incrementCounter,
  decrementCounter
} from './actions';


class App extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    counter: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  incrementButtonClick() {
    this.props.dispatch(incrementCounter(1));
  }

  decrementButtonClick() {
    this.props.dispatch(decrementCounter(1));
  }

  render() {
    return (
      <div id="banner">
        <h1><i className="fa fa-star-o" ></i> React is working!</h1>
        <p>Current Counter: <span id="counter">{this.props.counter}</span></p>
        <button id="incrementCounter" onClick={this.incrementButtonClick.bind(this)}>Increment</button>
        <button id="decrementCounter" onClick={this.decrementButtonClick.bind(this)}>Decrement</button>
      </div>
    )
  }
}
export default App;
