/* Libs */
import React from 'react';
import { connect } from 'react-redux';
import '../utils/validation.js';

/* Components */
import SiteHeader from '../components/SiteHeader';
import SiteContent from '../components/SiteContent/SiteContent.jsx';

/* Styles */
import '../../styles/app.scss';

const App = function(props) {
	let appNavItems = [{
		label: 'item1',
		link: '/'
	}, {
		label: 'item2',
		link: '/'
	}];

	return (
		<div>
			<SiteHeader siteTitle="Quiz Room" navItems={appNavItems} userInfo={props.userInfo} />
			<SiteContent>{props.children}</SiteContent>
		</div>
	);
};

const userInfoSelector = (state) => {
	let { id, username, image }  = state.user;
	return { id, username, image };
};

const mapStateToProps = function(state) {
	return {
		userInfo: userInfoSelector(state) 
	};
};

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps)(App);