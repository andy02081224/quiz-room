import React from 'react';

import TrueFalseControl from './TrueFalseControl.jsx';
import ConfirmButton from './ConfirmButton.jsx';

import './AnswerController.scss';

class AnswerController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentValue: null
		};
		this.handleTrueFalseClicked = this.handleTrueFalseClicked.bind(this);
		this.handleConfirmButtonClicked = this.handleConfirmButtonClicked.bind(this);
	}

	handleTrueFalseClicked(event) {
		let selectedValue = event.target.getAttribute('data-value');
		this.setState({
			currentValue: selectedValue
		});
	}

	handleConfirmButtonClicked() {

	}

	render() {
		return (
			<div className="container-fluid answer-controller">
				<TrueFalseControl onTrueFalseClicked={this.handleTrueFalseClicked} currentValue={this.state.currentValue} />
				<ConfirmButton onConfirmButtonClicked={this.handleConfirmButtonClicked} />
			</div>
		);
	}
} 

export default AnswerController;