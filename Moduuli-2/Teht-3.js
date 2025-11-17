const dogs = [];

for (let i = 0; i < 6; i++) {
  const dog = prompt(`Enter dog name ${i + 1}`);
  dogs.push(dog);
}

dogs.sort().reverse();

document.body.innerHTML += "<ul>";
for (const dog of dogs) {
  document.body.innerHTML += `<li>${dog}</li>`;
}
document.body.innerHTML += "</ul>";
