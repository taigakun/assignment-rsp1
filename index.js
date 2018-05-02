var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var totalNumofLogin = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

io.on('connect', (socket) => {
	totalNumofLogin++;
	io.emit('new user', totalNumofLogin);
	socket.on('disconnect', () => {
		socket.broadcast.emit('user disconnected');
		totalNumofLogin--;
	})
// socket.on('connect'){
// 	socket.emit('user name')
// }
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});