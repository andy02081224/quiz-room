import React from 'react';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';

class ControllerStartPage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;
	}

	componentDidMount() {
		// let socket = io.connect('http://localhost:3000');
		console.log('start page socket:', this.socket);
		let roomId = location.pathname.substring(1);

		this.socket.on('connect', () => {
			let playerName = prompt('請輸入名稱', `player-${this.socket.id.substring(0, 6)}`);

			if (playerName) {
				this.socket.emit('pair', {
					roomId: roomId,
					id: this.socket.id,
					playerName: playerName
				});
			}

			this.socket.on('gameStart', (data) => {
				if (data.gameStart) browserHistory.push(`${roomId}/${playerName}/game`);
			});
		});

	}

	render() {
		return (
			<div className="page page--controller-start">controller page</div>
		);
	}
}

export default ControllerStartPage;