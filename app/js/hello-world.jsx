import React from 'react';

export default class ReactTest extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>
        <i className="fa fa-star-o"></i>
        &nbsp;&nbsp;React is working!&nbsp;&nbsp;
        <i className="fa fa-star-o"></i>
      </h1>
    )
  }
}
