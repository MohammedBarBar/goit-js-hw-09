import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

const start = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let dateSelected = '';
start.disabled = true;
let countDown = 0;
// const currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected = selectedDates[0];
    if (dateSelected.getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (dateSelected.getTime() > new Date().getTime()) {
      start.disabled = false;
      Notiflix.Notify.success('Press Start to begin the Count Down');
      countDown = convertMs(dateSelected.getTime() - new Date().getTime());
      days.innerHTML = countDown.days;
      hours.innerHTML = countDown.hours;
      minutes.innerHTML = countDown.minutes;
      seconds.innerHTML = countDown.seconds;
    }
    // console.log(selectedDates[0]);
  },
};

flatpickr(inputDate, options);

// if (dateSelected.getDay() === currentDate.getDay()) console.log("lkhkjg");
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

start.addEventListener('click', () => {
  start.disabled = true;
  inputDate.disabled = true;
  var x = setInterval(function () {
    var distance = dateSelected.getTime() - new Date().getTime();
    var counter = convertMs(distance);
    if (
      counter.seconds < 10 ||
      counter.minutes < 10 ||
      counter.hours < 10 ||
      counter.days < 10
    ) {
      var secDigit = addLeadingZero(counter);
      days.innerHTML = secDigit.days;
      hours.innerHTML = secDigit.hours;
      minutes.innerHTML = secDigit.minutes;
      seconds.innerHTML = secDigit.seconds;
    } else {
      days.innerHTML = counter.days;
      hours.innerHTML = counter.hours;
      minutes.innerHTML = counter.minutes;
      seconds.innerHTML = counter.seconds;
    }

    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);
});

function addLeadingZero(value) {
  if (value.seconds < 10) {
    value.seconds = value.seconds.toString().padStart(2, '0');
  }
  if (value.minutes < 10) {
    value.minutes = value.minutes.toString().padStart(2, '0');
  }
  if (value.hours < 10) {
    value.hours = value.hours.toString().padStart(2, '0');
  }
  if (value.days < 10) {
    value.days = value.days.toString().padStart(2, '0');
  }

  return value;
}
