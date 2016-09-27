import React from 'react';
import { find } from 'lodash';

import FullscreenLabel from '../../components/FullscreenLabel/FullscreenLabel.jsx';
import PersonalResultViewer from '../../components/PersonalResultViewer/PersonalResultViewer.jsx';

class ControllerResultPage extends React.Component {
	constructor(props) {
		super(props);

		this.socket = this.props.route.socket;
		this.player = this.props.location.state.player;
		this.state = {
			result: null
		};
	}

	componentDidMount() {
		this.socket.on('gameResult', (data) => {
			console.log(data);
			let result = data;

			result.stats = find(result.playerStats, (player) => {
				return player.id == this.player.id;
			});
			
			this.setState({
				result: result
			});

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
		if (!this.state.result) {
			return (
				<FullscreenLabel title="Result Page" subtitle="Results Announcement" />
			);
		}
		else {
			return (
				<PersonalResultViewer 
					playerCount={this.state.result.playerCount} 
					questionCount={this.state.result.questionCount}
					stats={this.state.result.stats}
				/>
			);
		}

	}
}

export default ControllerResultPage;