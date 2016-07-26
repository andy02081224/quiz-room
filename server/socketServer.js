'use strict';

let io = require('socket.io');

function socketServer() {
	this.keyStore = {};
	this.io = null;
};

socketServer.prototype.listen = function(server) {
	this.io = io(server);

	this.io.on('connect', (socket) => {
		console.log('a user connected, socket id:' + socket.id);

		socket.on('roomId', (data) => {
			this.keyStore[data.roomId] = socket.id;
			socket.roomId = data.roomId;
			socket.join(data.roomId);

			console.log('Room ID:', data.roomId, 'Socket ID:', socket.id);
		});

		socket.on('pair', (data) => {
			let masterSocketId = this.keyStore[data.roomId];

			socket.join(data.roomId);
			socket.roomId = data.roomId;
			socket.playerName = data.playerName;

			this.io.to(masterSocketId).emit('addPlayer', data);
		})

		socket.on('gameStart', (data) => {
			this.io.to(data.roomId).emit('gameStart', { gameStart: true });
		});

		socket.on('questionChange', (data) => {
			this.io.to(socket.roomId).emit('questionChange', data);
		});

		socket.on('submitAnswer', (data) => {
			let masterSocketId = this.keyStore[data.roomId];

			this.io.to(masterSocketId).emit('receiveAnswer', data);
			console.log('master socket id:', masterSocketId);
			console.log(`${data.playerName} submits answer: ${data.answer}`)
		});	

		socket.on('nextQuestion', (data) => {
			this.io.to(socket.roomId).emit('nextQuestion', data);
		});
		
		socket.on('toController', (data) => {
			this.io.to(data.roomId).emit('fromMaster', 'message from game master');
		});

		socket.on('gameFinish', (data) => {
			this.io.to(socket.roomId).emit('gameFinish', data);
		});

		socket.on('gameResult', (data) => {
			this.io.to(socket.roomId).emit('gameResult', data);
		});

		socket.on('disconnect', (data) => {
			let masterId = this.keyStore[socket.roomId];
			
			this.io.to(masterId).emit('playerLeave', {
				id: socket.id.replace('/#', ''),
				roomId: socket.roomId,
				playerName: socket.playerName
			});
		});

	});
};

socketServer.prototype.connectPeers = function(key, cb) {
	console.log('keyStore:', this.keyStore);
	if (key in this.keyStore) {
		cb(false);
		// this.io.to(this.keyStore[key]).emit('fromPeer', 'hi');
	}
	else {
		cb(true);
	}
};

module.exports = socketServer;