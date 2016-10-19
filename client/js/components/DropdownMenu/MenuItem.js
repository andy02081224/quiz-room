import React from 'react';

const MenuItem = function(props) {
	return (
		<li className="menu__item" {...props}>{props.children}</li>
	);
};

MenuItem.propTypes = {
	text: React.PropTypes.string
};

export default MenuItem;