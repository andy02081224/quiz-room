import React from 'react';

import './PersonalResultViewer.scss';

class PersonalResultViewer extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="personal-result container">
				<div className="row">
					<div className="personal-result__seperator"></div>
					<section className="col-md-4 col-md-offset-2 personal-result__score">
						<header>Your Score</header>
						<div><span className="personal-result__highlight">{this.props.stats.score}&nbsp;</span>/{this.props.questionCount}</div>
					</section>
					<section className="col-md-4 personal-result__rank">
						<header>Your Rank</header>
						<div><span  className="personal-result__highlight">{this.props.stats.rank}&nbsp;</span>/{this.props.playerCount}</div>
					</section>
				</div>
			</div>
		);
	}
} 

export default PersonalResultViewer;