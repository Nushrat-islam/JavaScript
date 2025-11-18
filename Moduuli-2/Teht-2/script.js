const count = Number(prompt("How many participants?"));
const participants = [];

for (let i = 0; i < count; i++) {
  const name = prompt(`Enter name for participant ${i + 1}`);
  participants.push(name);
}

participants.sort();

document.body.innerHTML += "<ol>";
for (const name of participants) {
  document.body.innerHTML += `<li>${name}</li>`;
}
document.body.innerHTML += "</ol>";
