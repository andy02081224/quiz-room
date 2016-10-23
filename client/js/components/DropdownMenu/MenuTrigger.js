import React from 'react';

const MenuTrigger = function(props) {
	return (
		<div className="menu__trigger" onClick={props.onMenuTriggerClick}>
			{props.children}
		</div>
	);
};

export default MenuTrigger;
