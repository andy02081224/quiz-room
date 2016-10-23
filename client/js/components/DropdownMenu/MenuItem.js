import React from 'react';

const MenuItem = function(props) {
	function handleMenuItemClick(e) {
		if (props.disabled) {
			e.stopPropagation();
		}
	}

	return (
		<li className="menu__item" onClick={handleMenuItemClick}>
			{props.children}</li>
	);
};

MenuItem.propTypes = {
	disabled: React.PropTypes.bool
};

MenuItem.defaultProps = {
	disabled: false
};

export default MenuItem;