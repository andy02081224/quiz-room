import React from 'react';
import './SiteHeader.scss';

class SiteHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className="site-header">
				<div>{this.props.logo}</div>
			</header>
		);
	}
}

export default SiteHeader;