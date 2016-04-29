import React from 'react';
import AnswerController from '../components/AnswerController/AnswerController.jsx';
import io from 'socket.io-client';

class ControllerGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;
		this.playerName = this.props.params.playerName;
		this.roomId = this.props.params.roomId;
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="page page--controller-game">
				<AnswerController 
					socket={this.socket} 
					playerName={this.playerName}
					roomId={this.roomId} 
				/>
			</div>
		);
	}
}

export default ControllerGamePage;