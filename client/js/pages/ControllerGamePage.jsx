import React from 'react';
import AnswerController from '../components/AnswerController/AnswerController.jsx';
import io from 'socket.io-client';

class ControllerGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;

		this.player = {
			id: this.socket.id,
			playerName: this.props.params.playerName,
			roomId: this.props.params.roomId
		};
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="page page--controller-game">
				<AnswerController 
					socket={this.socket}
					player={this.player} 
				/>
			</div>
		);
	}
}

export default ControllerGamePage;