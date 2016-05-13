import React from 'react';

const BoxScore = function(props) {
	const playerRows = props.playerStats.map((player) => {
		return (<tr key={player.id}>
			<td>{player.name}</td>
			<td>{player.score}</td>
		</tr>);
	});

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{playerRows}
			</tbody>
		</table>
	);
};

export default BoxScore;