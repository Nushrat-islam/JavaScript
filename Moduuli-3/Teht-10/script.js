const form = document.querySelector('form');
const target = document.getElementById('target');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fname = document.querySelector('input[name="firstname"]').value;
  const lname = document.querySelector('input[name="lastname"]').value;

  target.textContent = `Your name is ${fname} ${lname}`;
});
