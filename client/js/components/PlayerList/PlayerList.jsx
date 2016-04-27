import React from 'react';
import './PlayerList.scss';

const PlayerList = function(props) {
	let players = props.players.map((player) => {
		return <li key={player.id}>{player.playerName}</li>;
	});
	// disabled={players.length < 2}
	return (
		<div className="player-list">
			<header>已加入玩家</header>
			<ul className="player-list__list">
				{players}
			</ul>
			<button 
				className="player-list__game-start-btn" 
				onClick={props.onGameStartClicked}>
				開始遊戲
			</button>
		</div>
	);
};

export default PlayerList;