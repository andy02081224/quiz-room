import React from 'react';
import ReactDOM from 'react-dom';

import MasterPage from './pages/MasterPage.jsx';


// var UID = generateUID();

// var gameIdText = document.getElementById('game-id');
// var gameParticipantList = document.getElementById('game-participants');
// var gameStartButton = document.getElementById('btn-game-start');

// var gameParticipants = [];

// gameStartButton.disabled = true;
// gameIdText.textContent =  gameIdText.textContent + UID;

// socket.emit('identifier', {UID: UID});

// socket.on('fromPeer', (data) => {
// 	gameParticipantList.innerHTML += `<li>${data}</li>`;
// 	gameParticipants.push(data);

// 	if (gameParticipants.length >= 2) {
// 		gameStartButton.disabled = false;
// 	}
// });

// gameStartButton.addEventListener('click', (event) => {
// 	socket.emit('toController', 'Game Start!')
// });

// function generateUID() {
//   return ("0000" + (Math.random()*Math.pow(36,6) << 0).toString(36)).slice(-6)
// }
// 



ReactDOM.render(<MasterPage />, document.getElementById('game-master'));
