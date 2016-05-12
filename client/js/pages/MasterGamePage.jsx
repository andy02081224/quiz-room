import React from 'react';
import Reveal from 'reveal.js';
import { extend, find } from 'lodash';

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
		// this.gameStats = {
		// 	winner: null,
		// 	players: this.props.location.state.players.map((player) => {
		// 		return {
		// 			id: player.id,
		// 			name: player.playerName,
		// 			score: 0
		// 		};
		// 	})
		// };
		this.state = {
			slidesData: {
				questions: []
			},
			gameState: {
				isGameFinished: false
			},
			playerState: this.props.location.state.players.map((player) => {
				return {
					id: player.id,
					name: player.playerName,
					score: 0,
					submitAnswer: false,
					submittedAnswers: []
				};
			})
		};

		this.handleSlideChange = this.handleSlideChange.bind(this);
		this.handleAllPlayerAnswer = this.handleAllPlayerAnswer.bind(this);
	}

	loadSlidesDataFromServer() {
		fetch('/temp.json')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					slidesData: data
				});
			})
			.catch();
	}

	registerSocketEvents() {
		this.socket.on('receiveAnswer', (data) => {
			console.log('receiveAnswer:', data);

			let updatedState = this.state.playerState.map((player) => {
				if (player.id == data.id) {
					player.submittedAnswers.push(data.answer);

					return extend(player, {
						submitAnswer: data.answer ? true : false
					});	
				}

				return player;
			});

			this.setState({
				playerState: updatedState
			});
		});
	}

	checkAnswer() {
		console.log(this.state.playerState);
		let answers = this.state.slidesData.questions.map((question) => {
			return question.answer;
		});

		console.log('Correct answers:', answers);
		let updatedState = this.state.playerState.map((player) => {
			console.log('Player answers:', player.submittedAnswers);

			player.score = player.submittedAnswers.filter((answer, index) => {
				return answer == answers[index].toString();
			}).length;

			return player;
		});

		console.log(updatedState);
	}

	handleSlideChange(slide) {
		console.log('Slide:', slide);

		if (slide.type == this.SLIDE_TYPES.INTRO) {
			setTimeout(() => Reveal.next(), 3000);
		}
		else if (slide.isQuestionSlide) {
			if (this.currentQuestionType != slide.type) {
				this.socket.emit('questionChange', {
					questionType: slide.type,
					optionCount: slide.optionCount
				});
			}

			this.currentQuestionType = slide.type;
		}
		else if (slide.type == this.SLIDE_TYPES.RESULT) {
			this.handleGameFinish();
		}
	}

	handleGameFinish() {
		console.log('game finish!');
		this.checkAnswer();
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
		this.loadSlidesDataFromServer();
		this.registerSocketEvents();
	}

	render() {
		return(
			<div className="page page--master-game">
				<PlayerTable playerState={this.state.playerState} onAllPlayerAnswer={this.handleAllPlayerAnswer} />
				<Slides slidesData={this.state.slidesData} slideTypes={this.SLIDE_TYPES} onSlideChange={this.handleSlideChange} />
			</div>
		);
	}
}

export default MasterGamePage;