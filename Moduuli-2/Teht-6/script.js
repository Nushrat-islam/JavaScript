function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

document.body.innerHTML += "<ul>";

let result;
do {
  result = rollDice();
  document.body.innerHTML += `<li>${result}</li>`;
} while (result !== 6);

document.body.innerHTML += "</ul>";
