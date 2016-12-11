export const incrementCounter = (num) => {
  return {
    type: 'INCREMENT',
    payload: num
  }
}

export const decrementCounter = (num) => {
  return {
    type: 'DECREMENT',
    payload: num
  }
}
