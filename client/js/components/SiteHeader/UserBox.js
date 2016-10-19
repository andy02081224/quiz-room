import React from 'react';
import { Link } from 'react-router';
import { Menu, MenuItem, Divider } from '../DropdownMenu';

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
			<div className={this.props.className} data-id={this.props.id}>
				<a onClick={this.toggleDropdown}>{this.props.username}</a>
				<Menu className={`${this.props.className}-menu`} open={this.state.dropdownOpen}>
					<MenuItem>{this.props.username} (@{this.props.username})</MenuItem>
					<Divider></Divider>
					<MenuItem><Link to="/settings">Settings</Link></MenuItem>
					<MenuItem>Log out</MenuItem>
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