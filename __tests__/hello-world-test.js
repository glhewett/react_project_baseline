// jest.unmock('HelloWorld');
jest.unmock('../app/js/hello-world.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import HelloWorld from '../app/js/hello-world.jsx';

describe('HelloWorld', () => {

  it('displays \"React is working!\"', () => {
    const component = TestUtils.renderIntoDocument(
      <HelloWorld />
    );

    const componentNode = ReactDOM.findDOMNode(component);
    expect(componentNode.textContent).toEqual('React is working!');
  });
});
