function palindrome(str) {
  str = str.replace(/[\s\W_]/g, '');

  return str.toLowerCase() == str.split('').reverse().join('').toLowerCase();
    
}

palindrome("A man, a plan, a canal. Panama");