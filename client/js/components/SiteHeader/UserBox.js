import React from 'react';
import { Link } from 'react-router';
import { Menu, MenuTrigger, MenuDropdown, MenuItem, Divider } from '../DropdownMenu';

class UserBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false
		};

		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	renderUserLink() {	
		return (
			<div className={this.props.className}>
				<Menu>
					<MenuTrigger>
						<div className={`${this.props.className}-avatar`}>
							<img src={`/img/user/${this.props.id}/64.jpg`} alt="user avatar"/>
						</div>
					</MenuTrigger>
					<MenuDropdown>
						<MenuItem disabled={true}>{this.props.username} (@{this.props.username})</MenuItem>
						<Divider></Divider>
						<MenuItem><Link to={`/profile/${this.props.username}`}>Your profile</Link></MenuItem>
						<MenuItem><Link to="/settings">Settings</Link></MenuItem>
						<Divider></Divider>
						<MenuItem onClick={this.props.onUserLogoutClick}>Log out</MenuItem>
					</MenuDropdown>
				</Menu>
			</div>
		);
	}

	renderLoginLink() {
		return (
			<div className={this.props.className}>
				<Link to="/login">Login</Link>
			</div>
		);
	}

	render() {
		if (this.props.id && this.props.username) {
			return this.renderUserLink();
		}
		else {
			return this.renderLoginLink();
		}
	}
}

export default UserBox;