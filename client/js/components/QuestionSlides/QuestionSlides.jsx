import React from 'react';
import Reveal from 'reveal.js';
import '../../../../node_modules/reveal.js/css/reveal.css';
import '../../../../node_modules/reveal.js/css/theme/solarized.css';

class QuestionSlides extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Reveal.initialize({
			slideNumber: true,
			center: true
		});
	}

	render() {
		return(
			<div className="reveal">
				<div className="slides">
					<section><h2>Q1: 美國的首都是紐約。</h2></section>
					<section>
						<h2>Q2: 第二次世界大戰在哪一年結束?</h2>
						<ul>
							<li>A: 1925</li>
							<li>B: 1945</li>
							<li>C: 1949</li>
							<li>D: 1989</li>
						</ul>
					</section>
					<section>
						<section>v1</section>
						<section>v2</section>
						<section>v3</section>
					</section>
				</div>
			</div>
		);
	}
}

export default QuestionSlides;