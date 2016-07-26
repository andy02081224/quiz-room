import React from 'react';

import './SiteContent.scss';

const SiteContent = function(props) {
	return (
		<div className="site-content">
			{props.children}
		</div>
	);
};

export default SiteContent;