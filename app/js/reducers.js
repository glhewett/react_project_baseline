import { combineReducers } from 'redux'
import counter from './counter-reducer'

const combinedReducers = combineReducers({
  counter
})

export default combinedReducers;
