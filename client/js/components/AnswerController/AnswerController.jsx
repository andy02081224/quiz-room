import React from 'react';
import { extend } from 'lodash';

import TrueFalseControl from './TrueFalseControl.jsx';
import MultipleChoiceControl from './MultipleChoiceControl.jsx';
import ConfirmButton from './ConfirmButton.jsx';

import './AnswerController.scss';

class AnswerController extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentValue: null
		};
		this.socket = this.props.socket;

		this.handleValueChanged = this.handleValueChanged.bind(this);
		this.handleConfirmButtonClicked = this.handleConfirmButtonClicked.bind(this);
	}

	componentDidMount() {
		this.socket.on('nextQuestion', (data) => {
			console.log('nextQuestion');
			this.setState({
				currentValue: null
			});	
		});
	}

	getDedicatedControl() {
		let control;

		switch (this.props.questionType) {
			case null:
				control = <div>Loading</div>;
				break;
			case 'question-true-false':
				control = (<TrueFalseControl 
					onValueChanged={this.handleValueChanged} 
					currentValue={this.state.currentValue} 
				/>);
				break;
			case 'question-multiple':
				control = (<MultipleChoiceControl 
					onValueChanged={this.handleValueChanged} 
					currentValue={this.state.currentValue}
					optionCount={this.props.optionCount} 
				/>);
				break;
			default:
				control = <div>Something Wrong</div>;
		}

		return control;
	}

	handleValueChanged(event) {
		let selectedValue = event.target.getAttribute('data-value');
		this.setState({
			currentValue: selectedValue
		});
	}

	handleConfirmButtonClicked() {
		this.socket.emit('submitAnswer', extend(this.props.player, {
			answer: this.state.currentValue
		}));
	}

	render() {
		let control = this.getDedicatedControl();

		return (
			<div className="container-fluid answer-controller">
				{control}
				<ConfirmButton onConfirmButtonClicked={this.handleConfirmButtonClicked} />
			</div>
		);
	}
} 

export default AnswerController;