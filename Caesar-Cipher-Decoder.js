function rot13(str) {
  const shift = 13;
  let newStr = "";

  for (let i = 0; i < str.length; i++) {
    if (/[A-Z]/.test(str[i])) {
      let charCode = str[i].charCodeAt() - shift;
      if (charCode < 65) charCode += 26;
      newStr += String.fromCharCode(charCode);
    } else newStr += str[i];
  }

  return newStr;
}

console.log(rot13("SERR PBQR PNZC"));
