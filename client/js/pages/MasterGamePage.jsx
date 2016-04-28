import React from 'react';
import QuestionSlides from '../components/QuestionSlides/QuestionSlides.jsx';

class MasterGamePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="page page--master-game">
				<QuestionSlides />
			</div>
		);
	}
}

export default MasterGamePage;