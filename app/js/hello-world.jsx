import React from 'react';

export default class ReactTest extends React.Component {

  constructor(props) {
    super(props);
    console.log("HI");
  }

  render() {
    return (
      <strong>React is working!</strong>
    )
  }
};
