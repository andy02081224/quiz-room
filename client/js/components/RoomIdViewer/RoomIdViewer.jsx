import React from 'react';
import './RoomIdViewer.scss';

const RoomIdViewer = function RoomIdViewer(props) {
	const qrcodeAPI = 'https://api.qrserver.com/v1/create-qr-code/?';
	let url = `${location.origin}/${props.roomId}`;
	let encodedUrl = encodeURIComponent(url);
	let qrcodeUrl = `${qrcodeAPI}size=${props.qrcodeSize}x${props.qrcodeSize}&data=${encodedUrl}`;

	return (
		<div className="roomId-viewer">
			<header className="roomId-viewer__header">請用瀏覽器開啟下列url或掃描條碼</header>
			<section className="roomId-viewer__url"><span>{url}</span></section>
			<section className="roomId-viewer__qrcode"><img src={qrcodeUrl} alt=""/></section>
		</div>
	);
}

RoomIdViewer.defaultProps = {
	qrcodeSize: 100
};

export default RoomIdViewer;