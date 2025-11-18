function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

const sides = Number(prompt("Enter number of sides:"));
document.body.innerHTML += "<ul>";

let r;
do {
  r = rollDice(sides);
  document.body.innerHTML += `<li>${r}</li>`;
} while (r !== sides);

document.body.innerHTML += "</ul>";
