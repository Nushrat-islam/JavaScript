const numCandidates = Number(prompt("How many candidates?"));
const candidates = [];

for (let i = 0; i < numCandidates; i++) {
  const name = prompt(`Name for candidate ${i + 1}:`);
  candidates.push({ name, votes: 0 });
}

const numVoters = Number(prompt("How many voters?"));

for (let i = 0; i < numVoters; i++) {
  const vote = prompt(`Voter ${i + 1}, who do you vote for?`);
  const candidate = candidates.find(c => c.name === vote);

  if (candidate) {
    candidate.votes++;
  } else {
    console.log("Empty or invalid vote counted.");
  }
}

candidates.sort((a, b) => b.votes - a.votes);

console.log(`The winner is ${candidates[0].name} with ${candidates[0].votes} votes.`);
console.log("Results:");
for (const c of candidates) {
  console.log(`${c.name}: ${c.votes} votes`);
}
