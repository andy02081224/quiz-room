import React from 'react';
import QuestionSlides from '../components/QuestionSlides/QuestionSlides.jsx';

class MasterGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;
		console.log('socket in game page:', this.props.route.socket);
	}

	componentDidMount() {
		this.socket.on('receiveAnswer', (data) => {
			alert(`name: ${data.playerName}, answer: ${data.answer}`);
			console.log(`name: ${data.playerName}, answer: ${data.answer}`);
		});
	}

	render() {
		return(
			<div className="page page--master-game">
				<QuestionSlides />
			</div>
		);
	}
}

export default MasterGamePage;