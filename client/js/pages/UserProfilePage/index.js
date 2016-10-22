import React from 'react';
import Panel from '../../components/Panel';

class UserProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('userProfile:', this.props.userProfile);
	}

	render() {
		return (
			<div className="page settings-page">
				<div className="wrapper container">
					<div className="row">
						<div className="col-md-12">
							<Panel>
								{this.props.userProfile.username}
							</Panel>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserProfilePage;