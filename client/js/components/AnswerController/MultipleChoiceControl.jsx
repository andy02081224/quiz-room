import React from 'react';
import { extend } from 'lodash';

import classNames from 'classnames';

const MultipleChoiceControl = function(props) {
	function getClassName(value) {
		let className = classNames({
			'col-md-6': true,
			'col-xs-12': true,
			'answer-controller__control-option': true,
			'answer-controller__control-option--selected': props.currentValue == value
		});

		return className;
	}

	return (
		<div className="answer-controller__control answer-controller__control--multiple" onClick={props.onValueChanged}>
			<div className="row">
				<div className={getClassName('a')} data-value="a">A</div>
				<div className={getClassName('b')} data-value="b">B</div>
			</div>
			<div className="row">
				<div className={getClassName('c')} data-value="c">C</div>
				<div className={getClassName('d')} data-value="d">D</div>
			</div>
		</div>
	);
};

export default MultipleChoiceControl;