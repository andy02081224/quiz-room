'use strict';

let io = require('socket.io');

function SocketServer() {
	this.keyStore = {};
	this.io = null;
};

SocketServer.prototype.listen = function(server) {
	this.io = io(server);

	this.io.on('connect', (socket) => {
		console.log('');
		console.log('--------------------------------------------');
		console.log('a user connected, socket id:' + socket.id);
		console.log('--------------------------------------------');

		socket.on('createRoom', (data) => {
			this.keyStore[data.roomID] = socket.id;
			socket.roomID = data.roomID;
			socket.join(data.roomID);

			console.log('Room ID:', data.roomID, 'Socket ID:', socket.id);
		});

		socket.on('joinRoom', (data) => {
			let masterSocketID = this.keyStore[data.roomID];

			socket.join(data.roomID);
			socket.roomID = data.roomID;
			socket.masterID = masterSocketID;
			socket.playerName = data.playerName;

			this.io.to(masterSocketID).emit('addPlayer', data);
		})

		socket.on('startGame', (data) => {
			socket.gameStart = true;
			this.io.to(data.roomID).emit('startGame');
		});

		socket.on('changeQuestionType', (data) => {
			this.io.to(socket.roomID).emit('changeQuestionType', data);
		});

		socket.on('submitAnswer', (data) => {
			this.io.to(socket.masterID).emit('receiveAnswer', data);
		});	

		socket.on('nextQuestion', (data) => {
			this.io.to(socket.roomID).emit('nextQuestion', data);
		});
		
		socket.on('gameFinish', (data) => {
			this.io.to(socket.roomID).emit('gameFinish', data);
		});

		socket.on('gameResult', (data) => {
			this.io.to(socket.roomID).emit('gameResult', data);
		});

		socket.on('disconnect', (data) => {
			let masterID = this.keyStore[socket.roomID];
			
			this.io.to(masterID).emit('playerLeave', {
				id: socket.id.replace('/#', ''),
				roomID: socket.roomID,
				playerName: socket.playerName
			});
		});

	});
};

SocketServer.prototype.isRoomExists = function(roomID) {
	console.log('isRoomExists:', roomID in this.keyStore);
	return (roomID in this.keyStore)
};

module.exports = SocketServer;