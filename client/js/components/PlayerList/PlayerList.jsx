import React from 'react';

const PlayerList = function(props) {
	let players = props.players.map((player) => {
		return <li key={player.id}>{player.name}</li>;
	});

	return (
		<div>
			<ul>{players}</ul>
		</div>
	);
};

export default PlayerList;