import React from 'react';

import { Link } from 'react-router';

import './QuestionSetViewer.scss';

/* Images */
import testImg from '../../../img/icons/temp.svg';
// import testImg from '../../../img/sc.jpg';

class QuestionSetViewer extends React.Component {
	constructor(props) {
		super(props);
	}

	renderQuestionSets() {
		console.log(this.props.questionSetList);
		let lastElementIndex = this.props.questionSetList.length - 1;
		let questionSets = [];
		let questionRow = [];

		this.props.questionSetList.forEach((questionSet, index) => {
			questionRow.push((
				<div className="col-md-4">
					<article className="questionset-viewer__question-set" key={questionSet._id}>
						<Link to={`/register/${questionSet._id}`}>
							<div className="questionset-viewer__question-set-image">
								<img src={testImg} alt=""/>
							</div>
							<header className="questionset-viewer__question-set-header">
								<div className="questionset-viewer__question-set-title">{questionSet.title}</div>
								<div className="questionset-viewer__question-set-subtitle">{questionSet.subtitle}</div>
							</header>
						</Link>
					</article>
				</div>
			));

			if (questionRow.length % 3 == 0 || index == lastElementIndex) {
				let newRow = React.createElement('div', {className: 'row'}, questionRow);
				questionSets.push(newRow);
				questionRow = [];
			}
		});

		return questionSets;
	}

	render() {
		return (
			<div className="questionset-viewer">
				<div className="container">
					{this.renderQuestionSets()}
				</div>
			</div>
		);
	}
}

export default QuestionSetViewer;