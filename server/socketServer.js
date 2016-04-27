'use strict';

let io = require('socket.io');

let socketServer = function() {
	this.keyStore = {};
	this.io = null;
};

socketServer.prototype.listen = function(server) {
	this.io = io(server);

	this.io.on('connect', (socket) => {
		console.log('a user connected, socket id:' + socket.id);

		socket.on('roomId', (data) => {
			this.keyStore[data.roomId] = socket.id;
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

		socket.on('toController', (data) => {
			this.io.to(data.roomId).emit('fromMaster', 'message from game master');
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

	if (key in this.keyStore) {
		cb(false);
		// this.io.to(this.keyStore[key]).emit('fromPeer', 'hi');
	}
	else {
		cb(true);
	}
};

module.exports = socketServer;