import React from 'react';
import Reveal from 'reveal.js';
import { extend } from 'lodash';

/* Components */
import IntroSlide from './IntroSlide.jsx';
import QuestionSlide from './QuestionSlide.jsx';

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
		let slideType = slide.getAttribute('data-type');
		let wrappedObj = {
			type: slide.getAttribute('data-type'),
			isQuestionSlide: slideType ? slideType.startsWith('question') : false
		};

		return extend(wrappedObj, extendObj);
	}

	renderQuestionSlides() {
		let questionSlides = this.props.slidesData.questions.map((question, index) => {
			return (<QuestionSlide
				key={index}
				type={question.type}
				title={question.title}
				options={question.options}
			/>);
		});

		return questionSlides;
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
						title={this.props.slidesData.title}
						subtitle={this.props.slidesData.subtitle}
						content={this.props.slidesData.description} 
					/>
					{this.renderQuestionSlides()}
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