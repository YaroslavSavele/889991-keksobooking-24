function getRandomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomDecimal(min, max, count) {
  const rand = min + Math.random() * (max - min);
  return Number(rand.toFixed(count));
}

getRandomInteger(1, 5);
getRandomDecimal(1, 5, 4);


