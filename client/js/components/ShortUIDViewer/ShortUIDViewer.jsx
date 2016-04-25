import React from 'react';

const ShortUIDViewer = function(props) {
	// TODO: put url qrcode
	return (
		<div>請用瀏覽器開啟下列url: {`${location.origin}/${props.UID}`}</div>
	);

}

export default ShortUIDViewer;