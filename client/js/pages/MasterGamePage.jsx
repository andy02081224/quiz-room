import React from 'react';
import QuestionSlides from '../components/QuestionSlides/QuestionSlides.jsx';

class MasterGamePage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="page page--master-game">
				<QuestionSlides players={this.props.location.state.players} socket={this.socket} />
			</div>
		);
	}
}

export default MasterGamePage;