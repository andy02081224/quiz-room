import React from 'react';
import Reveal from 'reveal.js';
import { extend, find } from 'lodash';
import { withRouter } from 'react-router';

import PlayerTable from '../components/PlayerTable/PlayerTable.jsx';
import QuestionSlides from '../components/QuestionSlides/QuestionSlides.jsx';


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


		this.state = {
			playerState: this.props.location.state.players.map((player) => {
				return {
					id: player.id,
					name: player.playerName,
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

	checkAnswerAndGetGameResult() {
		let answers = this.props.location.state.questionSet.questions.map((question) => {
			if (question.type == 'question-multiple') {
				return question.answer.split(':')[0];
			}
			else {
				return question.answer;
			}
		});

		let gameResult = {
			questionSetName: this.props.location.state.questionSet.title,
			playerCount: this.state.playerState.length,
			questionCount: answers.length
		};

		gameResult.playerStats = this.state.playerState.map((player) => {
			let stats = {};

			stats.id = player.id;
			stats.name = player.name;
			stats.submittedAnswers = player.submittedAnswers;
			console.log('submittedAnswers:', player.submittedAnswers);
			console.log('answers:', answers);
			stats.score = player.submittedAnswers.filter((answer, index) => {
				return answer == answers[index].toString();
			}).length;

			return stats;
		});

		gameResult.playerStats.sort(function sortByScore(a, b) {
			b.score - a.score;
		});

		
		let rank = 1;

		gameResult.playerStats.forEach(function calculateRank(player, index) {
			if (index == 0) {
				player.rank = rank;
				calculateRank.previousRank = player.rank;
				calculateRank.previousScore = player.score;
				return;
			}

			if (player.score == calculateRank.previousScore) {
				player.rank = calculateRank.previousRank;
				rank++;
			}
			else {
				player.rank = ++rank;
				calculateRank.previousScore = player.score;
				calculateRank.previousRank = player.rank;
			}
		});

		return gameResult;
	}

	handleSlideChange(slide) {
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
			this.socket.emit('gameFinish');
			this.handleGameFinish();
		}
	}

	handleGameFinish() {
		console.log('game finish!');

		let gameResult = this.checkAnswerAndGetGameResult();

		this.props.router.push({
			pathname: '/result',
			state: {
				result: gameResult
			}
		});
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
		// this.loadSlidesDataFromServer();
		this.registerSocketEvents();
	}

	render() {
		return(
			<div className="page page--master-game">
				<PlayerTable playerState={this.state.playerState} onAllPlayerAnswer={this.handleAllPlayerAnswer} />
				<QuestionSlides slidesData={this.props.location.state.questionSet} slideTypes={this.SLIDE_TYPES} onSlideChange={this.handleSlideChange} />
			</div>
		);
	}
}

export default withRouter(MasterGamePage);