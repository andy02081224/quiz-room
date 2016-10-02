/* Libs */
import React from 'react';
import Validation from 'react-validation';
import Spinner from '../Spinner';

class LoginForm extends React.Component {
	static propTypes = {
		onLoginClick: React.PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			inputUsername: '',
			inputPassword: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		let name = e.target.getAttribute('name');

		this.setState({
			[name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		let credentials = {
			username: this.state.inputUsername,
			password: this.state.inputPassword
		};

		this.props.onLoginClick(credentials);
	}

	render() {
		let { Form, Input, Button } = Validation.components;

		return (
			<Form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Username</label>
					<Input 
						className="form-input" 
						type="text" 
						value={this.state.inputUsername} 
						name="inputUsername" 
						validations={['required']} 
						onChange={this.handleInputChange} 
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<Input 
						className="form-input" 
						type="password" 
						value={this.state.inputPassword} 
						name="inputPassword" 
						validations={['required']} 
						onChange={this.handleInputChange} 
					/>
				</div>
				<div className="form-group">
					<span className="form-error">{this.props.authMessage}</span>
					<Button className="btn btn--success btn--block" type="submit">
						{ this.props.isProcessing ? <Spinner /> : 'Log in' }
					</Button>
				</div>
			</Form>
		);
	}
}

export default LoginForm;