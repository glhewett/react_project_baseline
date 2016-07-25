import React from 'react';

import {
  incrementCounter,
  decrementCounter
} from './actions';

class HelloWorld extends React.Component {

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
        <h1>
          <i className="fa fa-star-o" ></i>
          &nbsp;{this.props.counter}&nbsp;
          React is working!
          &nbsp;{this.props.counter}&nbsp;
          <i className="fa fa-star-o"></i>
        </h1>
        <button onClick={this.incrementButtonClick.bind(this)}>Increment</button>
        <button onClick={this.decrementButtonClick.bind(this)}>Decrement</button>
      </div>
    )
  }
}

export default HelloWorld
