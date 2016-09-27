/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import io from 'socket.io-client';

/* Components */
import ControllerStartPage from './pages/ControllerStartPage';
import ControllerGamePage from './pages/ControllerGamePage';
import ControllerResultPage from './pages/ControllerResultPage';

/* Styles */
import '../styles/app.scss';

let socket = io.connect(`${location.hostname}:3000`);

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/room/:roomId" socket={socket} component={ControllerStartPage}></Route>
		<Route path="/room/:roomId/game" socket={socket} component={ControllerGamePage}></Route>
		<Route path="/room/:roomId/result" socket={socket} component={ControllerResultPage}></Route>
	</Router>
), document.getElementById('app'));