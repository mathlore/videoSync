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
    console.log(Array.from(io.sockets.sockets.keys()))
    let leaderID = Array.from(io.sockets.sockets.keys())[0]
    socket.emit('leaderId',  leaderID);
    socket.on('video-data',(data)=>{
        socket.broadcast.emit('video-data',data);
    })
    socket.on('video-play',(data)=>{
        socket.broadcast.emit('video-play',data);
    })
    socket.on('disconnect',()=>{
        leaderID = null;
        console.log("A user disconnected");
        if(leaderID === null){
            const remainingSocket = Array.from(io.sockets.sockets.keys());
            console.log(Array.from(io.sockets.sockets.keys()));
            console.log(remainingSocket);
            leaderID = remainingSocket[0];
            console.log('leaderId:', leaderID);
            socket.broadcast.emit('new-leader',leaderID);
        }
    })
})
