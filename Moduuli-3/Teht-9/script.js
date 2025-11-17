const button = document.querySelector('button');
const resultEl = document.getElementById('result');

button.addEventListener('click', () => {
  const input = document.getElementById('calculation').value;

  let operator;
  if (input.includes('+')) operator = '+';
  else if (input.includes('-')) operator = '-';
  else if (input.includes('*')) operator = '*';
  else if (input.includes('/')) operator = '/';

  const parts = input.split(operator);
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  let result;

  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = a / b; break;
  }

  resultEl.textContent = result;
});
