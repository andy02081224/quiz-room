let logicController = {
	activate: function(socket) {
		this.socket = socket;
	},
	connectPeers: function(key, cb) {
		this.socket.connectPeers(key, cb);
	}
}



module.exports = logicController;

