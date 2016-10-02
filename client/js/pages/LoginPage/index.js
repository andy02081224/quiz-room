/* Libs */
import React from 'react';

/* Components */
import AuthBox from '../../components/AuthBox';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="page login-page">
				<div className="content-wrapper">
					<AuthBox 
						onLoginClick={this.props.loginUser}
						isProcessing={this.props.ui.isProcessing}
						authMessage={this.props.ui.authMessage}
					/>
				</div>
			</div>
		);
	}
}

export default LoginPage;