/* Libs */
import React from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router';
import { getQuestionSetList } from '../../utils/apiManager.js';

/* Components */
import SiteTitle from '../../components/SiteTitle/SiteTitle.jsx';
import QuestionSetViewer from '../../components/QuestionSetViewer/QuestionSetViewer.jsx';


class MasterStartPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			questionSetList: []
		};
	}

	componentDidMount() {
		this.setQuestionSetList();
	}

	setQuestionSetList() {
		getQuestionSetList()
			.then((response) => {
				let questionSetList = response;
				this.setState({
					questionSetList: questionSetList
				});
			});
	}

	render() {
		return (
			<div className="page master-start-page">
				<div className="content-wrapper">
					<QuestionSetViewer questionSetList={this.state.questionSetList} />
				</div>
			</div>
		);
	}
}

export default withRouter(MasterStartPage);