const form = document.querySelector('form');
const search = form.querySelector('input');
const messageOne = document.querySelector('#one');
const messageTwo = document.querySelector('#two');

form.addEventListener('submit', e => {
  e.preventDefault();
  messageOne.textContent = 'Loading';
  messageTwo.textContent = '';
  fetch('/weather?address=' + search.value).then(response => {
    response.json().then(({error, location, forecast}) => {
      if(error) {
        messageOne.textContent = error;
      } else {
        messageTwo.textContent = location;
        messageOne.textContent = forecast;
      }
    });
  });
})