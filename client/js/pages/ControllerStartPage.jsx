/* Libs */
import React from 'react';
import io from 'socket.io-client';
import sw from 'sweetalert';
import classNames from 'classnames';
import { withRouter } from 'react-router';

/* Components */
import FullscreenLabel from '../components/FullscreenLabel/FullscreenLabel.jsx';


class ControllerStartPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hideInstruction: true
		};

		this.handlePlayerNameConfirm = this.handlePlayerNameConfirm.bind(this);

		this.socket = this.props.route.socket;
	}

	componentDidMount() {
		this.registerSocketEvents();
	}

	registerSocketEvents() {
		this.socket.on('connect', () => {
			sw({   
				title: "請輸入名稱:",   
				type: "input",
				inputValue: `player-${this.socket.id.substring(0, 6)}`,  
				closeOnConfirm: false,   
				animation: true,   
				inputPlaceholder: '玩家姓名' 
			}, this.handlePlayerNameConfirm);
		});
	}

	handlePlayerNameConfirm(playerName) {
		let roomID = location.pathname.match(/\/room\/(\w{6})/)[1];

		this.socket.on('startGame', (data) => {
			this.props.router.push({
				pathname: `/room/${roomID}/game`,
				state: {
					roomID: roomID,
					playerName: playerName
				}
			});
			// browserHistory.push(`/${roomID}/${playerName}/game`);
		});

		if (!playerName.trim()) {     
			sw.showInputError("請輸入玩家姓名!");     
			return false;   
		}      

		this.socket.emit('joinRoom', {
			roomID: roomID,
			id: this.socket.id,
			playerName: playerName
		});

		sw.close();

		this.setState({
			hideInstruction: false
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

export default withRouter(ControllerStartPage);