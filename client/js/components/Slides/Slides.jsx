import React from 'react';
import Reveal from 'reveal.js';
import { extend } from 'lodash';

/* Components */
import IntroSlide from './IntroSlide.jsx';

/* Styles */
import '../../../../node_modules/reveal.js/css/reveal.css';
import '../../../../node_modules/reveal.js/css/theme/solarized.css';
import './Slides.scss';

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
		 * 1.Starts with "INTRO": Intro slide
		 * 2.Starts with "QUESTION": Question slide
		 * 3.Starts with "RESULT": Result slide 
		 */
		
		let questionTypes = Object.keys(this.props.slideTypes).filter((type) => {
			return type.startsWith('QUESTION');
		});

		return (
			<div className="reveal">
				<div className="slides">
					<IntroSlide 
						type={this.props.slideTypes.INTRO} 
						title="Quiz Room"
						subtitle="Your online game room"
						content="中文測試" 
					/>
					<IntroSlide 
						type={this.props.slideTypes.INTRO} 
						title="是非題"
					/>
					<section data-type={this.props.slideTypes.QUESTION_TRUE_FALSE}>
						<h2>Q1: 玉山的高度超過4000公尺。</h2>
					</section>
					<section data-type={this.props.slideTypes.INTRO}>
						<h2>選擇題題</h2>
					</section>
					<section data-type={this.props.slideTypes.QUESTION_MULTIPLE}>
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