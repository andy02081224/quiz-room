/* Dependencies */
import React from 'react';
import io from 'socket.io-client';
import { findIndex } from 'lodash';
import Utils from '../utils/utils';
import { browserHistory } from 'react-router';

/* Components */
import RoomIdViewer from '../components/RoomIdViewer/RoomIdViewer.jsx';
import PlayerList from '../components/PlayerList/PlayerList.jsx';

/* Styles */
import '../../styles/app.scss';


class MasterStartPage extends React.Component {
	static defaultProps = {
		roomId: Utils.generateShortUID()
	};

	constructor(props) {
		super(props);

		this.handleGameStartClicked = this.handleGameStartClicked.bind(this);

		this.socket = null;
		this.state = {
			players: []
		}
	}

	componentDidMount() {
		this.socket = io.connect('http://localhost:3000');

		this.socket.on('connect', () => {
			this.socket.emit('roomId', {roomId: this.props.roomId});

			this.socket.on('addPlayer', (data) => {
				this.setState({
					players: this.state.players.concat([data])
				})
			});

			this.socket.on('playerLeave', (data) => {
				console.log(`Player ${data.playerName} has left!`);

				// Find left player and remove it from player list
				this.setState({
					players: this.state.players.filter((player) => player.id != data.id)
				});
			});

			this.socket.on('gameStart', (data) => {
				if (data.gameStart) browserHistory.push('/game');
			})
		});

	}

	handleGameStartClicked() {
		this.socket.emit('gameStart', {roomId: this.props.roomId});
	}

	render() {
		return (
			<div className="page page--master">
				<RoomIdViewer roomId={this.props.roomId} />
				<PlayerList players={this.state.players} onGameStartClicked={this.handleGameStartClicked}/>
			</div>
		);
	}
}

export default MasterStartPage;