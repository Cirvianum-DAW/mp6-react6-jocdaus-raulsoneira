function dau6() {
  return Math.floor(Math.random() * 6) + 1;
}

function getTirades(n) {
    return [...Array(n)].map(dau6);
}


function sum(nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}

export { dau6, getTirades, sum };