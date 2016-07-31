import { connect } from 'react-redux';
import App from './App';

let mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(App);
