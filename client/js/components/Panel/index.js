import React from 'react';
import './style.scss';

const Panel = function(props) {
	let header = props.header 
		? <div className="panel__header">{props.header}</div> 
		: null;
	let style = { textAlign: props.textAlign }

	return (
		<div className="panel" style={style}>
			{header}
			<div className="panel__body">{props.children}</div>
		</div>
	);
};

Panel.propTypes = {
	header: React.PropTypes.string,
	textAlign: React.PropTypes.string
};

Panel.defaultProps = {
	textAlign: 'center'
};

export default Panel;