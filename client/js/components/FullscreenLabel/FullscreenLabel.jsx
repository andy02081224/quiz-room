import React from 'react';

import './FullscreenLabel.scss';

class FullscreenLabel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="fs-label">
				<div className="fs-label__title">{this.props.title}</div>
				<div className="fs-label__subtitle">{this.props.subtitle}</div>
			</div>
		);
	}
}

export default FullscreenLabel;