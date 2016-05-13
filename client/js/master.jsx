/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import io from 'socket.io-client';

/* Components */
import MasterStartPage from './pages/MasterStartPage.jsx';
import MasterGamePage from './pages/MasterGamePage.jsx';
import MasterResultPage from './pages/MasterResultPage.jsx';

/* Styles */
import '../styles/app.scss';

let socket = io.connect('http://localhost:3000');

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" socket={socket} component={MasterStartPage}></Route>
		<Route path="/game" socket={socket} component={MasterGamePage}></Route>
		<Route path="/result" socket={socket} component={MasterResultPage}></Route>
	</Router>
), document.getElementById('app'));
