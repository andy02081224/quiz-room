import React from 'react';

class MasterResultPage extends React.Component {
	constructor(props) {
		super(props);

		this.socket = this.props.route.socket;
		// this.result = this.props.location.state.result;
		this.result = {
			playerCount: 2,
			questionCount: 3,
			questionSetName: "Question Set 1",
			playerStats: [{
				id: '123',
				name: 'player1',
				score: 3,
				submittedAnswers: ['a', 'b', 'c']
			}, {
				id: '456',
				name: 'player2',
				score: 2,
				submittedAnswers: ['a', 'a', 'c']
			}]
		};

		console.log(this.result);
	}

	render() {
		return (
			<div>MasterResultPage</div>
		);
	}
}

export default MasterResultPage;