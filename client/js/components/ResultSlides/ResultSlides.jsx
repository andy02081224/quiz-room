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
	}

	render() {
		let links = [{
			title: 'Box Score',
			href: '#/box-score'
		}];

		return (
			<div className="reveal">
				<AnnouncementAnimation winner={this.props.gameResult.winner} links={links}>
					<section id="box-score">
						<BoxScore playerStats={this.props.gameResult.playerStats} />
					</section>
				</AnnouncementAnimation>
			</div>
		);
	}
}

export default ResultSlides;