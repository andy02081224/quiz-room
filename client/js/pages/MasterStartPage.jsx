/* Dependencies */
import React from 'react';
import io from 'socket.io-client';
import { findIndex } from 'lodash';
import Utils from '../utils/utils';
import { browserHistory, withRouter } from 'react-router';

/* Components */
import Panel from '../components/Panel/Panel.jsx';
import RoomIdViewer from '../components/RoomIdViewer/RoomIdViewer.jsx';
import PlayerList from '../components/PlayerList/PlayerList.jsx';


class MasterStartPage extends React.Component {
	static defaultProps = {
		roomId: Utils.generateShortUID()
	};

	constructor(props) {
		super(props);

		this.handleGameStartClicked = this.handleGameStartClicked.bind(this);
		console.log('router:', this.props);
		this.socket = this.props.route.socket;
		this.state = {
			players: []
		};
	}

	componentDidMount() {
		// this.socket = io.connect('http://localhost:3000');

		this.socket.on('connect', () => {
			this.socket.emit('roomId', {roomId: this.props.roomId});

			this.socket.on('addPlayer', (data) => {
				this.setState({
					players: this.state.players.concat([data])
				});
			});

			this.socket.on('playerLeave', (data) => {
				console.log(`Player ${data.playerName} has left!`);

				// Find left player and remove it from player list
				this.setState({
					players: this.state.players.filter((player) => player.id != data.id)
				});
			});

			this.socket.on('gameStart', (data) => {
				// if (data.gameStart) browserHistory.push('/game');
				if (data.gameStart) {
					this.props.router.push({
						pathname: '/game',
						state: {
							players: this.state.players
						}
					});
				}
			});
		});

	}

	handleGameStartClicked() {
		this.socket.emit('gameStart', {roomId: this.props.roomId});
	}

	render() {
		return (
			<div className="master-start-page">
				<div className="wrapper container">
					<div className="row">
						<Panel className="col-md-6 col-md-offset-3" header="請用瀏覽器開啟下列url或掃描條碼">
							<RoomIdViewer roomId={this.props.roomId} />
						</Panel>
					</div>
					<div className="row">
						<Panel className="col-md-6 col-md-offset-3" header="已加入玩家">
							<PlayerList players={this.state.players} onGameStartClicked={this.handleGameStartClicked}/>
						</Panel>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(MasterStartPage);