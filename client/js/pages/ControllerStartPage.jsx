import React from 'react';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';

class ControllerStartPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let socket = io.connect('http://localhost:3000');
		let roomId = location.pathname.substring(1);

		socket.on('connect', () => {
			let playerName = prompt('請輸入名稱', `player-${socket.id.substring(0, 6)}`);

			if (playerName) {
				socket.emit('pair', {
					roomId: roomId,
					id: socket.id,
					playerName: playerName
				});
			}

			socket.on('gameStart', (data) => {
				if (data.gameStart) browserHistory.push(`${roomId}/game`);
			});
		});

	}

	render() {
		return (
			<div>controller page</div>
		);
	}
}

export default ControllerStartPage;