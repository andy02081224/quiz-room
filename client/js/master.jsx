import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import MasterStartPage from './pages/MasterStartPage.jsx';
import MasterGamePage from './pages/MasterGamePage.jsx';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={MasterStartPage}></Route>
		<Route path="/game" component={MasterGamePage}></Route>
	</Router>
), document.getElementById('app'));
