import React from 'react';

const PlayerTable = function(props) {
	let players = props.playerState.map((player) => {
		return (
			<tr key={player.id}>
				<td>{player.name}</td>
				<td>{player.submitAnswer}</td>
			</tr>
		);
	});

	return (
		<table>
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