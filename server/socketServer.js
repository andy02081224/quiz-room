'use strict';

let io = require('socket.io');

let socketServer = function() {
	this.keyStore = {};
	this.keyPairs = {};
	this.io = null;
};

socketServer.prototype.listen = function(server) {
	this.io = io(server);

	this.io.on('connect', (socket) => {
		console.log('a user connected, socket id:' + socket.id);

		socket.on('identifier', (data) => {
			this.keyStore[data.roomId] = socket.id;
			this.keyPairs[socket.id] = [];
			// socket.join(socket.id);

			console.log('Room ID:', data.roomId, 'Socket ID:', socket.id);
		});

		socket.on('pair', (data) => {
			let masterSocketId = this.keyStore[data.roomId];

			this.keyPairs[masterSocketId].push(data);
			this.io.to(masterSocketId).emit('fromPeer', data);
		})

		socket.on('toController', (data) => {
			this.keyPairs[socket.id].forEach((player) => {
				this.io.to(player.id).emit('fromMaster', data);
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