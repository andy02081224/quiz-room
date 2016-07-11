import React from 'react';
import './SiteTitle.scss';

const SiteTitle = function(props) {
	return (
		<div className="site-title">
				{props.title}
		</div>
	);
};

export default SiteTitle;