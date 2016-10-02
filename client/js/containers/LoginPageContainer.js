import { connect } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import {
	loginUser
} from '../actions/user.js';

const mapStateToProps = function(state) {
	return {
		user: state.user,
		ui: state.user.ui
	};
};

const mapDispatchToProps = {
	loginUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);