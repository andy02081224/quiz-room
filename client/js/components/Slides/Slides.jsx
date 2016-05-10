import React from 'react';
import Reveal from 'reveal.js';
import { extend } from 'lodash';

/* Styles */
import '../../../../node_modules/reveal.js/css/reveal.css';
import '../../../../node_modules/reveal.js/css/theme/solarized.css';

class Slides extends React.Component {
	constructor(props) {
		super(props);

		// this.currentSlideType = null;
	}

	componentDidMount() {
		Reveal.initialize({
			slideNumber: true,
			center: true,
			overview: false
		});

		let firstSlide = document.querySelector('.slides > section[data-type]');
		let firstSlideType = this.getSlideWrappedObj(firstSlide, {
			indexh: 0,
			indexv: 0
		});

		this.props.onSlideChange(firstSlideType);

		Reveal.addEventListener('slidechanged', (event) => {
			let slide = this.getSlideWrappedObj(event.currentSlide, {
				indexh: event.indexh,
				indexv: event.indexv
			});

			this.props.onSlideChange(slide);
		});
	}

	getSlideWrappedObj(slide, extendObj={}) {
		let wrappedObj = {
			type: slide.getAttribute('data-type'),
			isQuestionSlide: slide.getAttribute('data-type').startsWith('question')
		};

		return extend(wrappedObj, extendObj);
	}

	render() {
		/**
		 * Slide types:
		 * 1.Starts with "intro": Intro slide
		 * 2.Starts with "question": Question slide
		 * 3.Starts with "result": Result slide 
		 */
		return (
			<div className="reveal">
				<div className="slides">
					<section data-type={this.props.slideTypes.INTRO}>
						<h2>是非題</h2>
					</section>
					<section data-type={`${this.props.slideTypes.QUESTION}-trueFalse`}>
						<h2>Q1: 美國的首都是紐約。</h2>
					</section>
					<section data-type={`${this.props.slideTypes.QUESTION}-trueFalse`}>
						<h2>Q1: 玉山的高度超過4000公尺。</h2>
					</section>
					<section data-type={this.props.slideTypes.INTRO}>
						<h2>選擇題題</h2>
					</section>
					<section data-type={`${this.props.slideTypes.QUESTION}-multiple`}>
						<h2>Q2: 第二次世界大戰在哪一年結束?</h2>
						<ul>
							<li>A: 1925</li>
							<li>B: 1945</li>
							<li>C: 1949</li>
							<li>D: 1989</li>
						</ul>
					</section>
					<section data-type={this.props.slideTypes.RESULT}>
						<section>v1</section>
						<section>v2</section>
						<section>v3</section>
					</section>
				</div>
			</div>
		);
	}
}

export default Slides;