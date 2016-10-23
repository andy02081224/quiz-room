import React from 'react';
import classNames from 'classnames';
import './style.scss';

const MenuDropdown = function(props) {
	return (
		<div className="menu__dropdown">
			<ul onClick={props.onMenuItemClick}>{props.children}</ul>
		</div>
	);
};


export default MenuDropdown;