/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import io from 'socket.io-client';

/* Components */
import SiteHeader from './components/SiteHeader/SiteHeader.jsx';
import SiteContent from './components/SiteContent/SiteContent.jsx';


/* Page Components */
import MasterStartPage from './pages/MasterStartPage.jsx';
import MasterRegisterPage from './pages/MasterRegisterPage.jsx';
import MasterGamePage from './pages/MasterGamePage.jsx';
import MasterResultPage from './pages/MasterResultPage.jsx';

/* Styles */
import '../styles/app.scss';

const app = function(props) {
	return (
		<div>
			<SiteHeader logo="Quiz Room" />
			<SiteContent>{props.children}</SiteContent>
		</div>
	);
};

let socket = io.connect(`${location.hostname}:3000`);

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={app}>
			<IndexRoute socket={socket} component={MasterStartPage} />
			<Route path="register" socket={socket} component={MasterRegisterPage} />
			<Route path="game" socket={socket} component={MasterGamePage} />
			<Route path="result" socket={socket} component={MasterResultPage} />
		</Route>
	</Router>
), document.getElementById('app'));
