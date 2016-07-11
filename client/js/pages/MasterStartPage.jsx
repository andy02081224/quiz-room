/* Dependencies */
import React from 'react';
import io from 'socket.io-client';
import { findIndex } from 'lodash';
import Utils from '../utils/utils';
import { browserHistory, withRouter } from 'react-router';

/* Components */
import SiteTitle from '../components/SiteTitle/SiteTitle.jsx';
import Panel from '../components/Panel/Panel.jsx';
import RoomIdViewer from '../components/RoomIdViewer/RoomIdViewer.jsx';
import PlayerList from '../components/PlayerList/PlayerList.jsx';


class MasterStartPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	handleGameStartClicked() {
	}

	render() {
		return (
			<div className="page page--master-start">
				<SiteTitle title="Quiz Room" />
			</div>
		);
	}
}

export default withRouter(MasterStartPage);