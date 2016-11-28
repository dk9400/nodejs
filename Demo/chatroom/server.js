var express = require('express');
var sio = require('socket.io');

var app = express.createServer(express.bodyParser(),express.static('public'));

app.listen(3000);

//绑定app
var io = sio.listen(app);
//连接监听器
io.sockets.on('connection', function(socket) {
    socket.on('join', function(name) {
        socket.nickname = name;
        socket.broadcast.emit('announcement', name+' joined the chat');
    });
    
    socket.on('text', function(msg) {
        socket.broadcast.emit('text', socket.nickname, msg);
    });
    
});