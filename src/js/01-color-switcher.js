const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const onLoadPage = () => {
  refs.stopBtn.disabled = true;
};
onLoadPage();

let intervalId = null;

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const changeBgColor = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};

const onStartBtn = () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  intervalId = setInterval(changeBgColor, 1000);
};

const onStopBtn = () => {
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;

  clearInterval(intervalId);
};

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);
