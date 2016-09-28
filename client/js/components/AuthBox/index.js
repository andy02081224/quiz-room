/* Libs */
import React from 'react';
import classNames from 'classnames';

/* Components */
import TabLayout from '../TabLayout';
import LoginForm from './LoginForm.js';
import SignUpForm from './SignUpForm.js';

/* Styles */
import './style.scss';

class AuthBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let tabData = [{
			id: 'login',
			label: 'Log in'
		}, { 
			id: 'signUp',
			label: 'Sign up'
		}];

		return (
			<div className="auth-box">
				<header>Quiz Room</header>
				<TabLayout tabData={tabData} selectedTab="login">
					<div data-tab-id="login">
						<LoginForm />
					</div>		
					<div data-tab-id="signUp">
						<SignUpForm />
					</div>
				</TabLayout>
				
			</div>
		);
	}
}

export default AuthBox;
