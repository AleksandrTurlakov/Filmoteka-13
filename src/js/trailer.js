const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

export let player;
export function onYouTubeIframeAPIReady(key) {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: `${key}`,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 30000);
    done = true;
  }
}
export function stopVideo() {
  player.stopVideo();
}