/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import io from 'socket.io-client';

/* Components */
import SiteHeader from './components/SiteHeader/SiteHeader.jsx';
import SiteContent from './components/SiteContent/SiteContent.jsx';


/* Page Components */
import LoginPage from './pages/LoginPage';
import MasterStartPage from './pages/MasterStartPage';
import MasterRegisterPage from './pages/MasterRegisterPage';
import MasterGamePage from './pages/MasterGamePage';
import MasterResultPage from './pages/MasterResultPage';

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
			<Route path="register/:id" socket={socket} component={MasterRegisterPage} />
			<Route path="game" socket={socket} component={MasterGamePage} />
			<Route path="result" socket={socket} component={MasterResultPage} />
			<Route path="login" socket={socket} component={LoginPage} />
		</Route>
	</Router>
), document.getElementById('app'));
