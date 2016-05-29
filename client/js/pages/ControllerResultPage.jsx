import React from 'react';

class ControllerResultPage extends React.Component {
	constructor(props) {
		super(props);

		this.socket = this.props.route.socket;
		this.state = {
			mode: 'annoucing'
		};
	}

	componentDidMount() {
		this.socket.on('gameResult', (data) => {
			console.log(data);
			// {
			// 	playerCount: 1,
			// 	questionCount: 3,
			// 	playerStats: [{
			// 		id: 'sdpvjwpev',
			// 		name: 'andy',
			// 		rank: 1,
			// 		score: 3
			// 	}]
			// }
		});
	}

	render() {
		return (
			<div>Result Page</div>
		);
	}
}

export default ControllerResultPage;