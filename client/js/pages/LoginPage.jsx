/* Libs */
import React from 'react';

/* Components */
import LoginForm from '../components/LoginForm/LoginForm.jsx';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="page login-page">
				<div className="content-wrapper">
					<LoginForm />
				</div>
			</div>
		);
	}
}

export default LoginPage;