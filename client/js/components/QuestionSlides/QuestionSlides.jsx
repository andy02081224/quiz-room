import React from 'react';
import Reveal from 'reveal.js';
import { extend } from 'lodash';

import '../../../../node_modules/reveal.js/css/reveal.css';
import '../../../../node_modules/reveal.js/css/theme/solarized.css';

import PlayerTable from './PlayerTable.jsx';

class QuestionSlides extends React.Component {
	constructor(props) {
		super(props);



		this.state = {
			playerState: this.props.players.map((player) => {
				return {
					id: player.id,
					name: player.playerName,
					submitAnswer: false
				};
			})
		};

		this.socket = this.props.socket;
	}

	componentDidMount() {
		Reveal.initialize({
			slideNumber: true,
			center: true
		});

		this.socket.on('receiveAnswer', (data) => {
			console.log('receiveAnswer:', data);

			let updatedState = this.state.playerState.map((player) => {
				if (player.id == data.id) {
					return extend(player, {
						submitAnswer: data.answer
					});	
				}

				return player;
			});

			console.log(updatedState);

			this.setState({
				playerState: updatedState
			});
		});
	}

	render() {
		return(
			<div className="reveal">
				<div className="slides">
					<section>
						<h2>Q1: 美國的首都是紐約。</h2>
						<PlayerTable playerState={this.state.playerState} />
					</section>
					<section>
						<h2>Q2: 第二次世界大戰在哪一年結束?</h2>
						<ul>
							<li>A: 1925</li>
							<li>B: 1945</li>
							<li>C: 1949</li>
							<li>D: 1989</li>
						</ul>
						<PlayerTable playerState={this.state.playerState} />
					</section>
					<section>
						<section>v1</section>
						<section>v2</section>
						<section>v3</section>
					</section>
				</div>
			</div>
		);
	}
}

export default QuestionSlides;