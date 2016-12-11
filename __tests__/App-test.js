jest.unmock('../src/App.jsx');
jest.unmock('../src/actions.js');

import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App.jsx';

describe('<App />', () => {
  var dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('displays that react is working', () => {
    const wrapper = shallow(<App dispatch={dispatch} counter={0} />);
    const found = wrapper.find('h1');
    expect(found.text()).toContain('React is working!');
  });

  it('displays star icon', () => {
    const wrapper = shallow(<App dispatch={dispatch} counter={0} />);
    const found = wrapper.find('.fa-star-o');
    expect(found.length).toBe(1);
  });

  it('displays counter', () => {
    const wrapper = shallow(<App dispatch={dispatch} counter={12} />);
    const found = wrapper.find('#counter');
    expect(found.text()).toBe('12');
  });

  it('dispatches when increment button is clicked', () => {
    const wrapper = shallow(<App dispatch={dispatch} counter={12} />);
    wrapper.find('button#incrementCounter').simulate('click');
    expect(dispatch).toBeCalledWith({type: 'INCREMENT', payload: 1});
  });

  it('dispatches when decrement button is clicked', () => {
    const wrapper = shallow(<App dispatch={dispatch} counter={12} />);
    wrapper.find('button#decrementCounter').simulate('click');
    expect(dispatch).toBeCalledWith({type: 'DECREMENT', payload: 1});
  });
});
