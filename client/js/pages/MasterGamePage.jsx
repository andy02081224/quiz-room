import React from 'react';
import Reveal from 'reveal.js';
import '../../../node_modules/reveal.js/css/reveal.css';
import '../../../node_modules/reveal.js/css/theme/solarized.css';
import src from '../../img/sc.jpg';


class MasterGamePage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(Reveal);
		Reveal.initialize({
			slideNumber: true,
			center: true
		});
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return(
			<div className="reveal">
				<div className="slides">
					<section><img src={src} alt=""/></section>
					<section><h1>I am a title</h1></section>
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

export default MasterGamePage;