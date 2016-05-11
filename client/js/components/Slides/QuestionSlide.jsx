import React from 'react';

import QuestionOption from './QuestionOption.jsx';

const QuestionSlide = function(props) {
	let optionLayout;

	if (props.options && Array.isArray(props.options)) {
		optionLayout = props.options.map((option, index) => {
			return <QuestionOption key={index} content={option} />;
		});

		optionLayout = React.createElement('ul', {}, optionLayout);
	}
	


	return (
		<section data-type={props.type}>
			<h2>{props.title}</h2>
			{optionLayout}
		</section>
	);
};

export default QuestionSlide;