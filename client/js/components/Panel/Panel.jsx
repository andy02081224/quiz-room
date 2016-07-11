import React from 'react';
import './Panel.scss';

const Panel = function(props) {
	let header = props.header 
		? <div className="panel__header">{props.header}</div> 
		: null;

	return (
		<div className="panel">
			{header}
			<div className="panel__body">{props.children}</div>
		</div>
	);
};

export default Panel;