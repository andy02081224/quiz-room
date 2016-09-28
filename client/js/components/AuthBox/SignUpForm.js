/* Libs */
import React from 'react';

class SignUpForm extends React.Component {
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
					<label>Email</label>
					<input className="form-input" type="text"/>
				</div>
				<div className="form-group">
					<label>Name</label>
					<input className="form-input" type="text"/>
				</div>
				<div className="form-group">
					<button className="btn btn--success btn--block" type="submit">Sign Up</button>
				</div>
			</form>
		);
	}
}

export default SignUpForm;