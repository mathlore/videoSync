const socket = io();
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: "200",
        width: "400",
        videoId: "1F3OGIFnW1k",
        playerVars: {
            'playsinline': 1,
            'loop': 0,
            'playlist': '1F3OGIFnW1k',
            'autoplay': 1,
            'mute': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        const currentTime = player.getCurrentTime();
        socket.emit('video-play', { currentTime });
    } else if (event.data === YT.PlayerState.PAUSED) {
        const currentTime = player.getCurrentTime();
        socket.emit('video-data', { currentTime });
    }
}

socket.on('video-data', (data) => {
    if (player) {
        player.pauseVideo();
        player.seekTo(data.currentTime, true);
    }
});

socket.on('video-play', (data) => {
    if (player) {
        player.seekTo(data.currentTime, true);
        player.playVideo();
    }
});

socket.on('leaderId',(data)=>{
    let p = document.createElement("div");
    if(socket.id === data){
        p.innerText = "YOU ARE THE LEADER";
    }
    else{
        p.innerText = "You are not the leader";
    }
    document.body.appendChild(p);
})

socket.on('new-leader',(data)=>{
    let r = document.createElement("div");
    if(socket.id === data){
        r.innerText = "YOU ARE THE NEW LEADER";
    }
    else{
        r.innerText = "You are not the leader";
    }
    document.body.appendChild(r);
})