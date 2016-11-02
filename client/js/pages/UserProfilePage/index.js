import React from 'react';
import Panel from '../../components/Panel';
import UserProfile from '../../components/UserProfile';

class UserProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="page settings-page">
				<div className="wrapper container">
					<div className="row">
						<div className="col-md-12">
							<Panel>
								<UserProfile profile={this.props.userProfile} />
							</Panel>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserProfilePage;