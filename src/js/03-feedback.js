import throttle from 'lodash.throttle';
const textInput = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');
const info = {
  email: '',
  message: '',
};
// console.log(localStorage.clear());
const dataStored = JSON.parse(localStorage.getItem('feedback-form-state'));
if (dataStored !== null) {
  //   emailInput.value = "";
  //   messageInput.innerHTML = "";
  // } else {
  emailInput.value = dataStored.email;
  messageInput.innerHTML = dataStored.message;
  info.email = dataStored.email;
  info.message = dataStored.message;
}
// console.log(dataStored);
textInput.addEventListener('input', event => {
  if (event.target.type === 'email') {
    info.email = event.target.value;
    load(info);
  } else if (event.target.type === 'textarea') {
    info.message = event.target.value;
    load(info);
  }
  //   load(info);
});
textInput.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return console.log('Please fill in all the fields!');
  }
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  console.log(info);
});
var load = throttle(function (data) {
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
  //   console.log(data);
}, 500);
