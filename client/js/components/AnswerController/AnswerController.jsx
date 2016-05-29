import React from 'react';
import { extend } from 'lodash';
import swal from 'sweetalert';

import TrueFalseControl from './TrueFalseControl.jsx';
import MultipleChoiceControl from './MultipleChoiceControl.jsx';
import ConfirmButton from './ConfirmButton.jsx';
import FullscreenLabel from '../FullscreenLabel/FullscreenLabel.jsx';

import '../../../../node_modules/sweetalert/dist/sweetalert.css';
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
			this.setState({
				currentValue: null
			});	

			swal.close();
		});
	}

	getDedicatedControl() {
		let control;

		switch (this.props.questionType) {
			case null:
				control = <FullscreenLabel title="Get Ready" />;
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
				control = (<FullscreenLabel 
					title="Something went wrong" 
					subtitle="Please contact the admin" 
				/>);
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
		if (!this.state.currentValue) {
			swal({
				title: "Please choose an answer"
			});

			return;
		}

		this.socket.emit('submitAnswer', extend(this.props.player, {
			answer: this.state.currentValue
		}));

		swal({
			title: "Waiting other players",
			showConfirmButton: false
		});
	}

	render() {
		let control = this.getDedicatedControl();

		return (
			<div className="answer-controller container-fluid">
				{control}
				<div className={this.props.questionType ? '' : 'hidden'}>
					<ConfirmButton onConfirmButtonClicked={this.handleConfirmButtonClicked} />
				</div>
			</div>
		);
	}
} 

export default AnswerController;