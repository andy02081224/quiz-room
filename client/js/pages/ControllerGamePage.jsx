import React from 'react';
import { browserHistory, withRouter } from 'react-router'; 
import io from 'socket.io-client';

import AnswerController from '../components/AnswerController/AnswerController.jsx';

class ControllerGamePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			questionType: null,
			options: null
		};

		this.socket = this.props.route.socket;
		this.player = {
			id: this.socket.id,
			playerName: this.props.params.playerName,
			roomId: this.props.params.roomId
		};
	}

	registerSocketEvents() {
		this.socket.on('questionChange', (data) => {
			this.setState({
				questionType: data.questionType,
				optionCount: data.optionCount
			});
		});

		this.socket.on('gameFinish', (data) => {
			this.props.router.push({
				pathname: `/${this.player.roomId}/${this.player.playerName}/result`,
				state: {
					player: this.player
				}
			});
			// {
			// 	playerCount: 2,
			// 	playerStats: [{
			// 		id: 'woigjwi',
			// 		name: 'andy',
			// 		score: 3
			// 	}],
			// 	questionCount: 3,
			// 	questionSetName: 'set 1'
			// }
		});
	}

	componentDidMount() {
		this.registerSocketEvents();
	}

	render() {
		return(
			<div className="page page--controller-game">
				<AnswerController 
					questionType={this.state.questionType}
					optionCount={this.state.optionCount}
					socket={this.socket}
					player={this.player} 
				/>
			</div>
		);
	}
}

export default withRouter(ControllerGamePage);