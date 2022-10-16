const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let timerId = null;
stop.disabled = true;

const startButton = () => {
  start.disabled = true;
  stop.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopButton = () => {
  start.disabled = false;
  stop.disabled = true;
  clearInterval(timerId);
};

start.addEventListener('click', startButton);
stop.addEventListener('click', stopButton);

// loop();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
