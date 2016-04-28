import React from 'react';

const ConfirmButton = function(props) {
	return (
		<button className="answer-controller__confirm-btn btn" onClick={props.onConfirmButtonClicked}>確認</button>
	);
};

export default ConfirmButton;