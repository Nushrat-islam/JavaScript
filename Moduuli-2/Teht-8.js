function concat(arr) {
  let result = "";
  for (const item of arr) {
    result += item;
  }
  return result;
}

const names = ["Johnny", "DeeDee", "Joey", "Marky"];
document.body.innerHTML = concat(names);
