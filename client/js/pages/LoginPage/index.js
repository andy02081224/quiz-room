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
					<AuthBox />
				</div>
			</div>
		);
	}
}

export default LoginPage;