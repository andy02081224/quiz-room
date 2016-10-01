/* Libs */
import React from 'react';
import { connect } from 'react-redux';

/* Components */
import SiteHeader from '../components/SiteHeader/SiteHeader.jsx';
import SiteContent from '../components/SiteContent/SiteContent.jsx';

/* Styles */
import '../../styles/app.scss';

const App = function(props) {
	return (
		<div>
			<SiteHeader logo="Quiz Room" />
			<SiteContent>{props.children}</SiteContent>
		</div>
	);
};

export default connect()(App);