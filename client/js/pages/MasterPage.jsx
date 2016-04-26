/* Dependencies */
import React from 'react';
import io from 'socket.io-client';
import Utils from '../utils/utils';

/* Components */
import RoomIdViewer from '../components/RoomIdViewer/RoomIdViewer.jsx';
import PlayerList from '../components/PlayerList/PlayerList.jsx';

/* Styles */
import '../../styles/app.scss';


class MasterPage extends React.Component {
	static defaultProps = {
		roomId: Utils.generateShortUID()
	};

	constructor(props) {
		super(props);
		this.state = {
			players: []
		}
	}

	componentDidMount() {
		let socket = io.connect('http://localhost:3000');

		socket.emit('identifier', {roomId: this.props.roomId});

		socket.on('fromPeer', (data) => {
			this.setState({
				players: this.state.players.concat([data])
			})

			console.log(this.state.players);
		});
	}

	render() {
		return (
			<div className="page page--master">
				<RoomIdViewer roomId={this.props.roomId} />
				<PlayerList players={this.state.players} />
			</div>
		);
	}
}

export default MasterPage;