import React from 'react';
import Reveal from 'reveal.js';
import { extend } from 'lodash';

import PlayerTable from '../components/PlayerTable/PlayerTable.jsx';
import Slides from '../components/Slides/Slides.jsx';


class MasterGamePage extends React.Component {
	constructor(props) {
		super(props);

		this.currentQuestionType = null;
		this.socket = this.props.route.socket;
		this.SLIDE_TYPES = {
			INTRO: 'intro',
			QUESTION_TRUE_FALSE: 'question-true-false',
			QUESTION_MULTIPLE: 'question-multiple',
			RESULT: 'result'
		};
		this.gameStats = {
			winner: null,
			score: this.props.location.state.players.map((player) => {
				return {
					id: player.id,
					name: player.playerName,
					score: 0
				};
			})
		};
		this.state = {
			playerState: this.props.location.state.players.map((player) => {
				return {
					id: player.id,
					name: player.playerName,
					submitAnswer: false
				};
			})
		};

		this.handleSlideChange = this.handleSlideChange.bind(this);
		this.handleAllPlayerAnswer = this.handleAllPlayerAnswer.bind(this);

	}

	handleSlideChange(slide) {
		console.log('Slide type:', slide);

		if (slide.type == this.SLIDE_TYPES.INTRO) {
			setTimeout(() => Reveal.next(), 3000);
		}
		else if (slide.isQuestionSlide) {
			if (this.currentQuestionType != slide.type) {
				this.socket.emit('questionTypeChange', {
					questionType: slide.type
				});
			}

			this.currentQuestionType = slide.type;
		}
		else if (slide.type == this.SLIDE_TYPES.RESULT) {
			// result
		}
	}

	handleAllPlayerAnswer() {
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

	componentDidMount() {
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

	render() {
		return(
			<div className="page page--master-game">
				<PlayerTable playerState={this.state.playerState} onAllPlayerAnswer={this.handleAllPlayerAnswer} />
				<Slides slideTypes={this.SLIDE_TYPES} onSlideChange={this.handleSlideChange} />
			</div>
		);
	}
}

export default MasterGamePage;