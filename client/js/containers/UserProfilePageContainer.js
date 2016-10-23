import { connect } from 'react-redux';
import UserProfilePage from '../pages/UserProfilePage';
import * as selectors from './commonSelectors';

const mapStateToProps = function(state) {
	return {
		userProfile: selectors.userProfileSelector(state)
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(UserProfilePage);