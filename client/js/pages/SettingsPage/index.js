import React from 'react';
import Panel from '../../components/Panel';

class SettingsPage extends React.Component {
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
								SettingsPage
							</Panel>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SettingsPage;