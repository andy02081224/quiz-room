/* Libs */
import React from 'react';
import { connect } from 'react-redux';
import '../utils/validation.js';
import { logoutUser } from '../actions/user';
import { userProfileSelector } from './commonSelectors';

/* Components */
import SiteHeader from '../components/SiteHeader';
import SiteContent from '../components/SiteContent/SiteContent.jsx';

/* Styles */
import '../../styles/app.scss';

const App = function(props) {
	let appNavItems = [];

	return (
		<div>
			<SiteHeader 
				siteTitle="Quiz Room" 
				navItems={appNavItems} 
				userInfo={props.userInfo} 
				onUserLogoutClick={props.logoutUser}
			/>
			<SiteContent>{props.children}</SiteContent>
		</div>
	);
};

const mapStateToProps = function(state) {
	return {
		userInfo: userProfileSelector(state) 
	};
};

const mapDispatchToProps = {
	logoutUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);





