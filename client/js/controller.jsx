// (function() {
// 	'use strict';

// 	var socket = io.connect('http://localhost:3000');
// 	var UID = location.pathname.substring(1);

// 	socket.emit('pair', {UID: UID});

// 	socket.on('fromMaster', (data) => {
// 		alert(data);
// 	});
// })();

import React from 'react';
import ReactDOM from 'react-dom';

import ControllerPage from './pages/ControllerPage.jsx';

ReactDOM.render(<ControllerPage />, document.getElementById('game-controller'));