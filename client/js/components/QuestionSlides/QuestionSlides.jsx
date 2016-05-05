/* Dependencies */
import React from 'react';
import Reveal from 'reveal.js';
import { extend } from 'lodash';

/* Styles */
import '../../../../node_modules/reveal.js/css/reveal.css';
import '../../../../node_modules/reveal.js/css/theme/solarized.css';
import './QuestionSlides.scss';

/* Subcomponents */
import PlayerTable from './PlayerTable.jsx';
import Slides from './Slides.jsx';

class QuestionSlides extends React.Component {
	constructor(props) {
		super(props);

		this.socket = this.props.socket;
		this.state = {
			playerState: this.props.players.map((player) => {
				return {
					id: player.id,
					name: player.playerName,
					submitAnswer: false
				};
			})
		};

		this.handleQuestionTypeChanged = this.handleQuestionTypeChanged.bind(this);
		this.handleAllPlayerAnswered = this.handleAllPlayerAnswered.bind(this);
	}

	componentDidMount() {
		Reveal.initialize({
			slideNumber: true,
			center: true,
			overview: false
		});

		this.socket.on('receiveAnswer', (data) => {
			console.log('receiveAnswer:', data);

			let updatedState = this.state.playerState.map((player) => {
				if (player.id == data.id) {
					return extend(player, {
						submitAnswer: data.answer ? true: false
					});	
				}

				return player;
			});

			this.setState({
				playerState: updatedState
			});
		});
	}

	handleQuestionTypeChanged(questionType) {
		console.log('questionType:', questionType);
		this.socket.emit('questionTypeChange', {
			questionType: questionType
		});
	}	

	handleAllPlayerAnswered() {
		console.log('All player answered!');

		this.setState({
			playerState: this.state.playerState.map((player) => {
				return extend(player, {
					submitAnswer: false
				});	
			})
		});

		this.socket.emit('nextQuestion', true);
		Reveal.next();
	}

	render() {
		return(

			<div className="reveal">
				<PlayerTable playerState={this.state.playerState} onAllPlayerAnswered={this.handleAllPlayerAnswered} />
				<Slides onQuestionTypeChanged={this.handleQuestionTypeChanged} />
			</div>
		);
	}
}

export default QuestionSlides;