/* Libs */
import React from 'react';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form>
				<div className="form-group">
					<label>Username</label>
					<input className="form-input" type="text"/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input className="form-input" type="password"/>
				</div>
				<div className="form-group">
					<button className="btn btn--success btn--block" type="submit">Log in</button>
				</div>
			</form>
		);
	}
}

export default LoginForm;