import React from 'react';
import Reveal from 'reveal.js';

class Slides extends React.Component {
	constructor(props) {
		super(props);

		this.currentSlideQuestionType = null;
	}

	componentDidMount() {
		let firstSlide = document.querySelector('.slides > section[data-question-type]');
		let firstSlideQuestionType = this.getSlideQuestionType(firstSlide);

		this.currentSlideQuestionType = firstSlideQuestionType;
		this.props.onQuestionTypeChanged(firstSlideQuestionType);

		Reveal.addEventListener('slidechanged', (event) => {
			let slideQuestionType = this.getSlideQuestionType(event.currentSlide);

			if (this.currentSlideQuestionType != slideQuestionType) {
				this.props.onQuestionTypeChanged(slideQuestionType);
			}
		});
	}

	getSlideQuestionType(sectionElement) {
		return sectionElement.getAttribute('data-question-type');
	}

	render() {
		return (
			<div className="slides">
				<section data-question-type="trueFalse">
					<h2>Q1: 美國的首都是紐約。</h2>
				</section>
				<section data-question-type="trueFalse">
					<h2>Q1: 玉山的高度超過4000公尺。</h2>
				</section>
				<section data-question-type="multiple">
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
		);
	}
}

export default Slides;