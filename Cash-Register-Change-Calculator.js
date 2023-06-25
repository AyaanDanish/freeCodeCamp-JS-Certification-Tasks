function checkCashRegister(price, cash, cid) {
  const coinValues = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  let changeDue = cash - price;

  let totalCashInRegister = cid.reduce((sum, item) => item[1] + sum, 0);
  let relevantCid = cid
    .filter((item) => coinValues[item[0]] < changeDue && item[1] > 0)
    .reverse();
  let relevantSum = relevantCid.reduce((sum, item) => item[1] + sum, 0);

  let result = { status: "", change: [] };

  if (changeDue > totalCashInRegister || changeDue > relevantSum) {
    result.status = "INSUFFICIENT_FUNDS";
    return result;
  }

  //We are guaranteed to find enough change at this point
  for (let i = 0; i < relevantCid.length; i++) {
    //If the current coin isn't enough for the final amount, exhaust all of that coin
    if (relevantCid[i][1] < changeDue) {
      result.change.push(relevantCid[i]);
      totalCashInRegister -= relevantCid[i][1];
      changeDue -= relevantCid[i][1];
    } else {
      //If the current coin DOES have enough to satisfy the entire amount
      let numCoins = Math.trunc(changeDue / coinValues[relevantCid[i][0]]);
      if (numCoins != 0)
        result.change.push([
          relevantCid[i][0],
          numCoins * coinValues[relevantCid[i][0]],
        ]);
      changeDue -= numCoins * coinValues[relevantCid[i][0]];
      totalCashInRegister -= numCoins * coinValues[relevantCid[i][0]];
      changeDue = changeDue.toFixed(2);
      totalCashInRegister = totalCashInRegister.toFixed(2);
    }
    if (changeDue == 0) {
      result.status = "OPEN";
      break;
    }
  }

  if (totalCashInRegister == 0) {
    result.status = "CLOSED";
    result.change = cid;
  }

  return result;
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
