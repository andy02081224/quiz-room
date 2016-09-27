import React from 'react';

import ResultSlides from '../../components/ResultSlides/ResultSlides.jsx';

class MasterResultPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleAnnoumcementFinish = this.handleAnnoumcementFinish.bind(this);
		
		this.socket = this.props.route.socket;
		this.questionSetID = this.props.location.state.questionSetID;
		this.result = this.props.location.state.result;
		// this.result = {
		// 	playerCount: 2,
		// 	questionCount: 3,
		// 	questionSetName: "Question Set 1",
		// 	winner: 'player1',
		// 	playerStats: [{
		// 		id: '123',
		// 		name: 'player1',
		// 		score: 3,
		// 		submittedAnswers: ['a', 'b', 'c']
		// 	}, {
		// 		id: '456',
		// 		name: 'player2',
		// 		score: 2,
		// 		submittedAnswers: ['a', 'a', 'c']
		// 	}]
		// };

		console.log(this.result);
	}

	handleAnnoumcementFinish() {
		this.socket.emit('gameResult', this.result);
	}

	render() {
		let links = [{
			title: 'Box Score',
			href: '#/box-score'
		}, {
			title: 'Replay',
			href: `/register/${this.questionSetID}`
		}, {
			title: 'Home',
			href: '/'
		}];

		return (
			<ResultSlides 
				links={links}
				gameResult={this.result} 
				onAnnoucementFinish={this.handleAnnoumcementFinish}
			/>
		);
	}
}

export default MasterResultPage;