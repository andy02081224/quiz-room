import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import io from 'socket.io-client';

/* Containers */
import AppContainer from './containers/AppContainer';
import LoginPage from './pages/LoginPage';
import MasterStartPage from './pages/MasterStartPage';
import MasterRegisterPage from './pages/MasterRegisterPage';
import MasterGamePage from './pages/MasterGamePage';
import MasterResultPage from './pages/MasterResultPage';
import ControllerStartPage from './pages/ControllerStartPage';
import ControllerGamePage from './pages/ControllerGamePage';
import ControllerResultPage from './pages/ControllerResultPage';


let socket = io.connect(`${location.hostname}:3000`);

let Routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<IndexRoute socket={socket} component={MasterStartPage} />
			<Route path="register/:id" socket={socket} component={MasterRegisterPage} />
			<Route path="game" socket={socket} component={MasterGamePage} />
			<Route path="result" socket={socket} component={MasterResultPage} />
			<Route path="login" socket={socket} component={LoginPage} />
			<Route path="/room/:roomId" socket={socket} component={ControllerStartPage}></Route>
			<Route path="/room/:roomId/game" socket={socket} component={ControllerGamePage}></Route>
			<Route path="/room/:roomId/result" socket={socket} component={ControllerResultPage}></Route>
		</Route>
	</Router>
);

export default Routes;