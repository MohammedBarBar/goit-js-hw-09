import Notiflix from 'notiflix';

const firstDealy = document.querySelector('[name=delay]');
const step = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const submit = document.querySelector('button');

let counter = 0,
  i,
  delay,
  delayStep;
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

submit.addEventListener('click', e => {
  e.preventDefault();
  i = 1;
  delay = Number(firstDealy.value);
  counter = Number(amount.value);
  delayStep = Number(step.value);
  while (counter > 0) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    counter--;
    i++;
    delay += delayStep;
  }
});
// while(> 0){

// }
