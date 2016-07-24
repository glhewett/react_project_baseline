jest.unmock('../app/js/hello-world.jsx');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HelloWorld from '../app/js/hello-world.jsx';

const ShallowRenderer = TestUtils.createRenderer();

describe('HelloWorld', () => {
  it('displays \"React is working!\"', () => {
    const result = ShallowRenderer.render(
      <HelloWorld />
    );
    expect(result.props.children).toEqual('React is working!');
  });
});
