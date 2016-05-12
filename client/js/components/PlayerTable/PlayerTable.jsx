import React from 'react';

import './PlayerTable.scss';

const PlayerTable = function(props) {
	let players = props.playerState.map((player) => {
		return (
			<tr key={player.id}>
				<td>{player.name}</td>
				<td>{player.submitAnswer ? 'Answer submited' : '' }</td>
			</tr>
		);
	});

	let allPlayerAnswered = props.playerState.every((player) => player.submitAnswer);
	if (allPlayerAnswered && props.playerState.length >= 1) setTimeout(() => props.onAllPlayerAnswer(), 1000);

	return (
		<table className="player-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Answer</th>
				</tr>
			</thead>
			<tbody>
				{players}
			</tbody>
		</table>
	);
};

export default PlayerTable;