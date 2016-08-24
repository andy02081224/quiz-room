/* Dependencies */
import React from 'react';
import io from 'socket.io-client';
import {withRouter} from 'react-router';

/* Components */
import SiteTitle from '../components/SiteTitle/SiteTitle.jsx';
import QuestionSetViewer from '../components/QuestionSetViewer/QuestionSetViewer.jsx';


class MasterStartPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			questionSetList: []
		}
	}

	componentDidMount() {
		this.loadQuestionSetList();
	}

	loadQuestionSetList() {
		return fetch('/api/questionset')
			.then((response) => {
				return response.text();
			})
			.then((body) => {
				return body;
			})
			.then((json) => {
				let questionSetList = JSON.parse(json);
				this.setState({
					questionSetList: questionSetList
				});
			})
			.catch((err) => console.log(err));
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