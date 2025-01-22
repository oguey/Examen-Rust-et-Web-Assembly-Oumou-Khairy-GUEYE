const { parsePlateauAndRovers, executeRoverInstructions, getFinalRoverPositions } = require('./marsRover');

describe('parsePlateauAndRovers', () => {
    test('should parse plateau dimensions and rover data correctly', () => {
        const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

        const expectedOutput = {
            plateau: [5, 5],
            rovers: [
                { x: 1, y: 2, direction: 'N', instructions: 'LMLMLMLMM' },
                { x: 3, y: 3, direction: 'E', instructions: 'MMRMMRMRRM' }
            ]
        };

        expect(parsePlateauAndRovers(input)).toEqual(expectedOutput);
    });

    test('should handle input with no rovers', () => {
        const input = `5 5`;

        const expectedOutput = {
            plateau: [5, 5],
            rovers: []
        };

        expect(parsePlateauAndRovers(input)).toEqual(expectedOutput);
    });

    test('should handle input with multiple rovers', () => {
        const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
2 2 S
MMRMMRMRRM`;

        const expectedOutput = {
            plateau: [5, 5],
            rovers: [
                { x: 1, y: 2, direction: 'N', instructions: 'LMLMLMLMM' },
                { x: 3, y: 3, direction: 'E', instructions: 'MMRMMRMRRM' },
                { x: 2, y: 2, direction: 'S', instructions: 'MMRMMRMRRM' }
            ]
        };

        expect(parsePlateauAndRovers(input)).toEqual(expectedOutput);
    });

    test('should handle input with extra spaces and newlines', () => {
        const input = `  5 5  
        
1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM  `;

        const expectedOutput = {
            plateau: [5, 5],
            rovers: [
                { x: 1, y: 2, direction: 'N', instructions: 'LMLMLMLMM' },
                { x: 3, y: 3, direction: 'E', instructions: 'MMRMMRMRRM' }
            ]
        };

        expect(parsePlateauAndRovers(input)).toEqual(expectedOutput);
    });
});

describe('executeRoverInstructions', () => {
    test('should move rover correctly based on instructions', () => {
        const plateau = [5, 5];
        const rover = { x: 1, y: 2, direction: 'N', instructions: 'LMLMLMLMM' };
        executeRoverInstructions(rover, plateau);
        const expectedOutput = { x: 1, y: 3, direction: 'N', instructions: 'LMLMLMLMM' };
        expect(rover).toEqual(expectedOutput);
    });

    test('should handle rover moving out of bounds', () => {
        const plateau = [5, 5];
        const rover = { x: 0, y: 0, direction: 'S', instructions: 'MMMMM' };
        executeRoverInstructions(rover, plateau);
        const expectedOutput = { x: 0, y: 0, direction: 'S', instructions: 'MMMMM' };
        expect(rover).toEqual(expectedOutput);
    });
});

describe('getFinalRoverPositions', () => {
    test('should return correct final positions and orientations for rovers', () => {
        const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
        const expectedOutput = `1 3 N
5 1 E`;
        expect(getFinalRoverPositions(input)).toEqual(expectedOutput);
    });

    test('should handle edge cases correctly', () => {
        const input = `5 5
0 0 N
MMMMM
0 0 E
MMMMM`;
        const expectedOutput = `0 5 N
5 0 E`;
        expect(getFinalRoverPositions(input)).toEqual(expectedOutput);
    });

    test('should handle no movement instructions', () => {
        const input = `5 5
1 2 N
`;
        const expectedOutput = `1 2 N`;
        expect(getFinalRoverPositions(input)).toEqual(expectedOutput);
    });
});