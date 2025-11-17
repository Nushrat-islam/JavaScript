const arr = [];
let number;

while (true) {
  number = Number(prompt("Enter a number:"));
  if (arr.includes(number)) {
    alert("Number already entered! Stopping...");
    break;
  }
  arr.push(number);
}

arr.sort((a, b) => a - b);
console.log(arr);
