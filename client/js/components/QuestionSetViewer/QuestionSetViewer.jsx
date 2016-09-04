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
    let lastElementIndex = this.props.questionSetList.length - 1;
    let questionSets = [];
    let questionRow = [];

    this.props.questionSetList.forEach((questionSet, index) => {
      let questionSetBGImageStyle = {
        backgroundImage: `url(${testImg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundOrigin: 'content-box'
      };

      questionRow.push((
        <div className="col-md-4" key={questionSet._id}>
					<article className="questionset-viewer__question-set">
						<Link to={`/register/${questionSet._id}`}>
							<div className="questionset-viewer__question-set-image" style={questionSetBGImageStyle}></div>
							<header className="questionset-viewer__question-set-header">
								<div className="questionset-viewer__question-set-title">{questionSet.title}</div>
								<div className="questionset-viewer__question-set-subtitle">{questionSet.subtitle}</div>
							</header>
						</Link>
					</article>
				</div>
      ));

      if (questionRow.length % 3 == 0 || index == lastElementIndex) {
        let newRow = React.createElement('div', { className: 'row', key: (questionRow.length / 3) }, questionRow);
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
