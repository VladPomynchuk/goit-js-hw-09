import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  timer: document.querySelector('.timer'),
  field: document.querySelectorAll('.field'),
  value: document.querySelectorAll('.value'),
  label: document.querySelectorAll('.label'),
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const changeStyle = () => {
  refs.timer.style.display = 'flex';
  refs.field.forEach(e => {
    e.style.marginRight = '15px';
  });
  refs.value.forEach(e => {
    e.style.fontSize = '40px';
  });
  refs.label.forEach(e => {
    e.style.textTransform = 'uppercase';
    e.style.display = 'block';
    e.style.fontSize = '15px';
  });
};
// const changeTime = value => {
//   const currentDate = new Date();
//   const currentTimerTime = currentDate.getTime();
//   const deltaTime = convertMs(value - currentTimerTime);
//   refs.days.textContent = addLeadingZero(deltaTime.days);
//   refs.hours.textContent = addLeadingZero(deltaTime.hours);
//   refs.minutes.textContent = addLeadingZero(deltaTime.minutes);
//   refs.seconds.textContent = addLeadingZero(deltaTime.seconds);
//   console.log('new time');
// };

const date = new Date();
const currentTime = date.getTime();

const btnOn = () => {
  refs.startBtn.disabled = false;
};
const btnOff = () => {
  refs.startBtn.disabled = true;
};

const onLoadPage = () => btnOff();
onLoadPage();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();

    if (selectedTime < currentTime) {
      btnOff();
      Notify.failure('Please choose a date in the future');
      return;
    }

    btnOn();

    const onStartClick = e => {
      changeStyle();
      intervalId = setInterval(() => {
        const currentDate = new Date();
        const currentTimerTime = currentDate.getTime();
        const deltaTime = convertMs(selectedTime - currentTimerTime);

        refs.days.textContent = addLeadingZero(deltaTime.days);
        refs.hours.textContent = addLeadingZero(deltaTime.hours);
        refs.minutes.textContent = addLeadingZero(deltaTime.minutes);
        refs.seconds.textContent = addLeadingZero(deltaTime.seconds);

        if (selectedTime - currentTimerTime <= 1000) {
          clearInterval(intervalId);
        }
      }, 1000);

      btnOff();

      refs.input.disabled = true;
    };

    refs.startBtn.addEventListener('click', onStartClick);
  },
};

flatpickr(refs.input, options);
