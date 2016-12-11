import { connect } from 'react-redux';
import App from './App.jsx';

let mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(App);
