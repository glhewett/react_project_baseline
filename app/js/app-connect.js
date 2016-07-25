import { connect } from 'react-redux';
import HelloWorld from './hello-world.jsx';

let mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(HelloWorld);
