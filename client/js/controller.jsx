import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import ControllerStartPage from './pages/ControllerStartPage.jsx';
import ControllerGamePage from './pages/ControllerGamePage.jsx';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/:gameId" component={ControllerStartPage}></Route>
		<Route path="/:gameId/game" component={ControllerGamePage}></Route>
	</Router>
), document.getElementById('app'));