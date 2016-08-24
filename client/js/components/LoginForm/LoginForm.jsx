/* Libs */
import React from 'react';

/* Styles */
import './LoginForm.scss';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="login-form">
				<div className="login-form__logo">
					Quiz Room
				</div>
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
						<button className="btn btn-block" type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

export default LoginForm;