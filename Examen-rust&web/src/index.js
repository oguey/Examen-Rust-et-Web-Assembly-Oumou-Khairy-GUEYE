const { getFinalRoverPositions } = require('./utils/marsRover');

const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

console.log(getFinalRoverPositions(input));