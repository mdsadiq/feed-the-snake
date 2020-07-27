const add2Dimension = (arr, addX = 0, addY = 0) => [
  arr[0] + addX,
  arr[1] + addY
];
const genRandom = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export { add2Dimension, genRandom };
