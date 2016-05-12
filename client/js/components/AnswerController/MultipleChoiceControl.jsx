import React from 'react';
import { extend } from 'lodash';

import classNames from 'classnames';

const MultipleChoiceControl = function(props) {
	let options = [];

	function getClassName(value) {
		let className = classNames({
			'col-md-6': true,
			'col-xs-12': true,
			'answer-controller__control-option': true,
			'answer-controller__control-option--selected': props.currentValue == value
		});

		return className;
	}

	function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
	}

	function renderOptions() {
		let options = [];
		let row = [];

		for (let i = 0, charCode = 97; i < props.optionCount; i++, charCode++) {
			let optionIndentifier = String.fromCharCode(charCode);
			let option = (<div 
				className={getClassName(optionIndentifier)} 
				data-value={optionIndentifier}>{optionIndentifier.toUpperCase()}</div>);

			row.push(option);

			if (i % 2 != 0 || (i % 2 == 0 && i == props.optionCount - 1)) {
				options.push(React.createElement('div', {className: 'row'}, row));
				row = [];
			}
		}

		return options;
	}


	return (
		<div className="answer-controller__control answer-controller__control--multiple" onClick={props.onValueChanged}>
			{renderOptions()}
		</div>
	);
};

export default MultipleChoiceControl;