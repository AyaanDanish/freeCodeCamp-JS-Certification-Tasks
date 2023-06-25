function convertToRoman(num) {
  let digits = [];
  let ans = [];
  let table = {
    0: { 3: "MMM", 2: "MM", 1: "M" },
    1: { 9: "CM", 5: "D", 4: "CD", 1: "C" },
    2: { 9: "XC", 5: "L", 4: "XL", 1: "X" },
    3: { 9: "IX", 5: "V", 4: "IV", 1: "I" },
  };

  while (num > 0) {
    digits.unshift(num % 10);
    num = Math.trunc(num / 10);
  }

  while (digits.length < 4) digits.unshift(0);

  console.log(digits);

  for (let i in digits) {
    if (digits[i] == 0) continue;

    if (table[i].hasOwnProperty(digits[i])) {
      ans.push(table[i][digits[i]]);
      continue;
    }

    if ([1, 2, 3].includes(digits[i])) {
      ans.push(table[i][1].repeat(digits[i]));
      continue;
    }

    if ([6, 7, 8].includes(digits[i])) {
      ans.push(table[i][5] + table[i][1].repeat(digits[i] - 5));
      continue;
    }
  }

  return ans.join("");
}

console.log(convertToRoman(798));
