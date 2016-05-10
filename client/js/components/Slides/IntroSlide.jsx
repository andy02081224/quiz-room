import React from 'react';

const IntroSlide = function(props) {
	return (
		<section data-type={props.type}>
			<h2>{props.title}</h2>
			<h4>{props.subtitle}</h4>
			<p>{props.content}</p>
		</section>
	);
};

export default IntroSlide;