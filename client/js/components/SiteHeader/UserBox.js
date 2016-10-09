import React from 'react';
import { Link } from 'react-router';

const UserBox = function(props) {
	if (props.id && props.username) {
		return (
			<div className={props.className} data-id={props.id}>
				{props.username }
			</div>
		);
	}
	else {
		return (
			<div className={props.className}>
				<Link to="/login">Login</Link>
			</div>
		);
	}
};

export default UserBox;