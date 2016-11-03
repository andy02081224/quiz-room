/* Libs */
import React from 'react';
import { Link } from 'react-router';

/* Styles */
import './style.scss';

/* Components */
import UserBox from './UserBox';

class SiteHeader extends React.Component {
	static propTypes = {
		siteTitle: React.PropTypes.string,
		navItems: React.PropTypes.array,
		userInfo: React.PropTypes.object
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
				<div className="container">
					<div className="site-header__logo">
						<Link to="/">{this.props.siteTitle}</Link>
					</div>
					<nav className="site-header__nav">
						<ul>
							{this.renderNavItems()}
						</ul>
					</nav>
					<UserBox 
						{...this.props.userInfo}
						className="site-header__user-box" 
						onUserLogoutClick={this.props.onUserLogoutClick} 
					/>
				</div>
			</header>
		);
	}
}

export default SiteHeader;