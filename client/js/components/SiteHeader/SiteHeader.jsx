/* Libs */
import React from 'react';
import { Link } from 'react-router';

/* Styles */
import './SiteHeader.scss';

class SiteHeader extends React.Component {
	static propTypes = {
		navItems: React.PropTypes.array
	};

	static defaultProps = {
		navItems: [{
			label: 'Login',
			link: '/login'
		}]
	};

	constructor(props) {
		super(props);
	}

	renderNavItems() {
		let navItems = this.props.navItems.map((item) => {
			return (
				<li key={item.label}>
					<Link to={item.link}>{item.label}</Link>
				</li>
			);
		});

		return navItems;
	}

	render() {
		return (
			<header className="site-header">
				<div className="content-wrapper">
					<div className="site-header__logo">{this.props.logo}</div>
					<nav className="site-header__nav">
						<ul>
							{this.renderNavItems()}
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}

export default SiteHeader;