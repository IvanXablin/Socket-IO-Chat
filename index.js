const Express = require('express');
const app = Express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(Express.static("public"));


io.on('connection', (socket) => {
    console.log('Пользователь подключен!');

    socket.on('disconnect', (msg) => {
        console.log('Пользователь отключен!');
    });

    socket.on('chat message', (obj) => {
        io.emit('chat message', obj.Message, obj.UserName);
    });
});

server.listen(5000, () => {
    console.log(`Server Online!, http://localhost:5000`);
});