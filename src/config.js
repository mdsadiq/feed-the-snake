//TODO: blockRandomizer
//TODO: wormRandomizer

export default {
  board: {
    row: 12,
    column: 12
  },
  block: {
    color: "orange",
    size: 2,
    location: [[1, 2], [2, 2]]
  },
  worm: {
    color: "darkgray",
    size: 2,
    location: [[1, 1], [1, 2], [1, 3]]
  },
  food: {
    color: "blue",
    location: [1, 2]
  },
  speed: null
};
