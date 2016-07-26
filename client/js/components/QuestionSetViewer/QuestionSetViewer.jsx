import React from 'react';

import { Link } from 'react-router';

import './QuestionSetViewer.scss';

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
				<article className="col-md-3" key={questionSet._id}>
					<Link to={`/register/${questionSet._id}`}>
						<header>
							<div>{questionSet.title}</div>
							<div>{questionSet.subtitle}</div>
						</header>
					</Link>
				</article>
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