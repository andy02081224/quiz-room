import React from 'react';
import classNames from 'classnames';
import './style.scss';

const Menu = function(props) {
	let menuClass = classNames('menu', ...props.className.split(' '), {
		'menu--open': props.open
	});

	return (
		<div className={menuClass}>
			<ul>{props.children}</ul>
		</div>
	);
};

Menu.propTypes = {
	className: React.PropTypes.string,
	open: React.PropTypes.bool
};

Menu.defaultProps = {
	open: true
};

export default Menu;