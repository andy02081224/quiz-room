import React from 'react';

const SiteContent = function(props) {
	return (
		<div className="site-content">
			{props.children}
		</div>
	);
};

export default SiteContent;