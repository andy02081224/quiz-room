import React from 'react';
import AnswerController from '../components/AnswerController/AnswerController.jsx';

class ControllerGamePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="page page--controller-game">
				<AnswerController />
			</div>
		);
	}
}

export default ControllerGamePage;