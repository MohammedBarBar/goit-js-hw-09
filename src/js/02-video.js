import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let sec = 0;
const onPlay = function (data) {
  // console.log(data);
  sec = data.seconds;
};

const onPause = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};
// console.log(localStorage.getItem('videoplayer-current-time'));
if (localStorage.getItem('videoplayer-current-time') !== null)
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

var load = throttle(function (data) {
  localStorage.setItem('videoplayer-current-time', data);
}, 1000);

var loop = function () {
  setTimeout(loop, 5);
  load(sec);
};

loop();

player.on('timeupdate', onPlay);

player.on('pause', onPause);
