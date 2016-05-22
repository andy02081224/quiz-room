import React from 'react';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';
import '../../../node_modules/sweetalert/dist/sweetalert.css';

class ControllerStartPage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;
	}

	componentDidMount() {
		let roomId = location.pathname.substring(1);


		this.socket.on('connect', () => {
			swal({   
				title: "請輸入名稱:",   
				type: "input",
				inputValue: `player-${this.socket.id.substring(0, 6)}`,  
				closeOnConfirm: false,   
				animation: "slide-from-top",   
				inputPlaceholder: 'Player Name' 
			}, function(playerName) {   
					if (playerName === "") {     
						swal.showInputError("You need to write something!");     
						return false;   
					}      

					if (playerName) {
						this.socket.emit('pair', {
							roomId: roomId,
							id: this.socket.id,
							playerName: playerName
						});
						swal.close();
					}


					this.socket.on('gameStart', (data) => {
						if (data.gameStart) browserHistory.push(`${roomId}/${playerName}/game`);
					});

			}.bind(this));
		});

	}

	render() {
		return (
			<div className="page page--controller-start">controller page</div>
		);
	}
}

export default ControllerStartPage;