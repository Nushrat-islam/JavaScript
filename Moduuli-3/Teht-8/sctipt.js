const calculateBtn = document.querySelector('button');

calculateBtn.addEventListener('click', () => {
  const n1 = Number(document.getElementById('num1').value);
  const n2 = Number(document.getElementById('num2').value);
  const operator = document.getElementById('operation').value;
  const resultEl = document.getElementById('result');

  let result;

  switch (operator) {
    case 'add': result = n1 + n2; break;
    case 'sub': result = n1 - n2; break;
    case 'multi': result = n1 * n2; break;
    case 'div': result = n1 / n2; break;
  }

  resultEl.textContent = result;
});
