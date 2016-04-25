import React from 'react';
import io from 'socket.io-client';

class ControllerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let socket = io.connect('http://localhost:3000');
		let roomId = location.pathname.substring(1);

		socket.on('connect', () => {
			let playerName = prompt('請輸入名稱', `player${socket.id}`);

			if (playerName) {
				socket.emit('pair', {
					roomId: roomId,
					id: socket.id,
					name: playerName
				});

			}
		})

	}

	render() {
		return (
			<div>controller page</div>
		);
	}
}

export default ControllerPage;