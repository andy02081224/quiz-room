import React from 'react';
import { extend } from 'lodash';

import classNames from 'classnames';

const TrueFalseControl = function(props) {
	let commonControlClasses = {
		'col-md-6': true,
		'col-xs-12': true,
		'answer-controller__control-option': true
	};

	let trueOptionClass = classNames(extend(commonControlClasses, {
		'answer-controller__control-option--selected': props.currentValue == 'true'
	}));

	let falseOptionClass = classNames(extend(commonControlClasses, {
		'answer-controller__control-option--selected': props.currentValue == 'false'
	}));

	return (
		<div className="row answer-controller__control answer-controller__control--true-false" onClick={props.onTrueFalseClicked}>
			<div className={trueOptionClass} data-value="true">O</div>
			<div className={falseOptionClass} data-value="false">X</div>
		</div>
	);
};

export default TrueFalseControl;