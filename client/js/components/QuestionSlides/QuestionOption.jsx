import React from 'react';

const QuestionOption = function(props) {
	return (
		<li data-identifier={props.identifier}>({props.identifier.toUpperCase()})&nbsp;{props.content}</li>
	);
};

export default QuestionOption;