import React from 'react';
import AnswerController from '../components/AnswerController/AnswerController.jsx';
import io from 'socket.io-client';

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

export default ControllerGamePage;