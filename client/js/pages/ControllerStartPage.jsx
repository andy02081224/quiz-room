import React from 'react';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';
import classNames from 'classnames';

import FullscreenLabel from '../components/FullscreenLabel/FullscreenLabel.jsx';
import '../../../node_modules/sweetalert/dist/sweetalert.css';


class ControllerStartPage extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.route.socket;
		this.state = {
			hideInstruction: true
		};
	}

	componentDidMount() {
		let roomId = location.pathname.substring(1);


		this.socket.on('connect', () => {
			swal({   
				title: "請輸入名稱:",   
				type: "input",
				inputValue: `player-${this.socket.id.substring(0, 6)}`,  
				closeOnConfirm: false,   
				animation: true,   
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
						this.setState({
							hideInstruction: false
						});
					}


					this.socket.on('gameStart', (data) => {
						if (data.gameStart) browserHistory.push(`/${roomId}/${playerName}/game`);
					});

			}.bind(this));
		});

	}

	render() {
		let labelClass = classNames({
			'hidden': this.state.hideInstruction
		});

		return (
			<div className="controller-start-page">
				<div className={labelClass}>
					<FullscreenLabel title="Waiting game to start" />
				</div>
			</div>
		);
	}
}

export default ControllerStartPage;