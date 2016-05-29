/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import io from 'socket.io-client';

/* Components */
import ControllerStartPage from './pages/ControllerStartPage.jsx';
import ControllerGamePage from './pages/ControllerGamePage.jsx';
import ControllerResultPage from './pages/ControllerResultPage.jsx';

/* Styles */
import '../styles/app.scss';

let socket = io.connect(`${location.hostname}:3000`);

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/:roomId" socket={socket} component={ControllerStartPage}></Route>
		<Route path="/:roomId/:playerName/game" socket={socket} component={ControllerGamePage}></Route>
		<Route path="/:roomId/:playerName/result" socket={socket} component={ControllerResultPage}></Route>
	</Router>
), document.getElementById('app'));