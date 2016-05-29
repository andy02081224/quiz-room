import React from 'react';
import Reveal from 'reveal.js';

import AnnouncementAnimation from './AnnouncementAnimation.jsx';
import BoxScore from './BoxScore.jsx';

/* Styles */
import '../../../../node_modules/reveal.js/css/reveal.css';
// import '../../../../node_modules/reveal.js/css/theme/sky.css';

class ResultSlides extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Reveal.initialize({
			center: true,
			controls: false,
			overview: false,
			autoSlide: 1000,
			progress: false,
			keyboard: false,
			autoSlideStoppable: false,
			touch: false,
			autoSlideMethod: Reveal.navigateRight
		});

		Reveal.addEventListener( 'fragmentshown', function(event) {
		    if (event.fragment.className.indexOf('fragment--last') > -1) {
					this.props.onAnnoucementFinish();
		    }
		}.bind(this));
	}

	render() {
		let links = [{
			title: 'Box Score',
			href: '#/box-score'
		}];

		let winners = this.props.gameResult.playerStats.filter((player) => {
			return player.rank == 1;
		});
		let winnerNames = winners.map((winner) => winner.name);


		return (
			<div className="reveal">
				<AnnouncementAnimation winnerNames={winnerNames} links={links}>
					<section id="box-score">
						<BoxScore playerStats={this.props.gameResult.playerStats} />
					</section>
				</AnnouncementAnimation>
			</div>
		);
	}
}

export default ResultSlides;