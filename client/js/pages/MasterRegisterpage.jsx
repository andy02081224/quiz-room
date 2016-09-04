/* Dependencies */
import React from 'react';
import io from 'socket.io-client';
import { findIndex } from 'lodash';
import utils from '../utils/utils';
import { browserHistory, withRouter } from 'react-router';
import  {
	getQuestionSet
} from '../utils/apiManager.js';

/* Components */
import Panel from '../components/Panel/Panel.jsx';
import RoomIdViewer from '../components/RoomIdViewer/RoomIdViewer.jsx';
import PlayerList from '../components/PlayerList/PlayerList.jsx';


class MasterRegisterPage extends React.Component {
	static defaultProps = {
		roomID: utils.generateShortUID()
	};

	constructor(props) {
		super(props);

		this.state = {
			status: 'loading', // loading (when question set is loading) | ready
			players: []
		};

		this.handleGameStartClicked = this.handleGameStartClicked.bind(this);
		this.socket = this.props.route.socket;
	}

	componentDidMount() {
		this.loadQuestionSet();
		this.registerSocketEvents();

		this.socket.emit('createRoom', {roomID: this.props.roomID});
	}

	loadQuestionSet() {
		getQuestionSet(this.props.params.id)
			.then((response) => {
				console.log(response);
				this.questionSet = response;
				this.setState({
					status: 'ready'
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	registerSocketEvents() {
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

		this.socket.on('startGame', (data) => {
			this.props.router.push({
				pathname: '/game',
				state: {
					questionSet: this.questionSet,
					players: this.state.players
				}
			});
		});
	}

	handleGameStartClicked() {
		this.socket.emit('startGame', {roomID: this.props.roomID});
	}

	render() {
		return (
			<div className="master-start-page">
				<div className="wrapper container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<Panel header="請用瀏覽器開啟下列url或掃描條碼">
								<RoomIdViewer roomId={this.props.roomID} />
							</Panel>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<Panel header="已加入玩家">
								<PlayerList players={this.state.players} onGameStartClicked={this.handleGameStartClicked}/>
							</Panel>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(MasterRegisterPage);