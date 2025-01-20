const express = require('express');
const path = require('path');
const { createServer } = require('http');
const {Server} = require('socket.io');
const { Socket } = require('dgram');
const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 5000;

app.use(express.static(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'yt.html'))
})

server.listen(PORT,()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})

io.on("connection",(socket)=>{
    console.log("A user connected");
    socket.on('disconnect',()=>{
        console.log("A user disconnected");
    })
})