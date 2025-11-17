const nums = [];
let input;

while (input !== 0) {
  input = Number(prompt("Enter a number (0 to stop):"));
  if (input !== 0) nums.push(input);
}

nums.sort((a, b) => b - a);

for (const n of nums) {
  console.log(n);
}
