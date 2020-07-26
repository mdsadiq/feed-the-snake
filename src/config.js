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
    location: [[0, 1], [0, 2], [0, 3]]
  },
  food: {
    color: "blue",
    location: [1, 2]
  },
  speed: null
};
