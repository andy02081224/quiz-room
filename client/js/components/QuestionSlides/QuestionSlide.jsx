import React from 'react';

import QuestionOption from './QuestionOption.jsx';

const QuestionSlide = function(props) {
	let optionLayout;

	if (props.options && Array.isArray(props.options)) {
		optionLayout = props.options.map((option, index) => {
			let identifier = option.split(':')[0];
			let content = option.split(':')[1];

			return (<QuestionOption 
				key={index} 
				identifier={identifier} 
				content={content} 
			/>);
		});

		optionLayout = React.createElement('ul', {}, optionLayout);
	}
	


	return (
		<section data-type={props.type}>
			<h2>Q{props.index}.&nbsp;{props.title}</h2>
			{optionLayout}
		</section>
	);
};

export default QuestionSlide;