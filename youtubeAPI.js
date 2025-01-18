var tag =document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);

var player;

function onYouTubeIframeAPIReady(){
    player = new YT.Player('player',{
        height: "200",
        width: '400',
        videoId: '1F3OGIFnW1k',
        playerVars: {
            'playsinline':1,
            'loop':0,
            'playlist': '1F3OGIFnW1k'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event){
    event.target.playVideo();

}
function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.PLAYING){
        console.log(player.getCurrentTime());
    }
    if(event.data == YT.PlayerState.ENDED){
        const p = document.createElement("p");
        p.innerText = "Video has ended,Type OK TO CONTINUE PLAYING";
        document.body.appendChild(p);        
        setTimeout(()=>{
            while(text !== "OK"){
                var text = window.prompt("Enter the text: ");
                if(text === "OK"){
                setTimeout(()=>{
                    player.nextVideo();
                },2000);
            }
        }
        },1000);
    }
}


