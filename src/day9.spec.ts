import * as Day9 from './day9'
import { assert } from 'chai';

describe(`Advent of Code 2022 - Day 9`, async () => {

    it.skip(`should test the run`, async () => {
        Day9.run();
    });


    it(`should transform an object position RIGHT`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: 0};

        const result = Day9.moveRight(input);
        assert.deepEqual(result, expected);
    });

    it(`should transform an object position LEFT`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: 0};

        const result = Day9.moveLeft(input);
        assert.deepEqual(result, expected);
    });

    it(`should transform an object position UP`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 0, y: 1};

        const result = Day9.moveUp(input);
        assert.deepEqual(result, expected);
    });

    it(`should transform an object position DOWN`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 0, y: -1};

        const result = Day9.moveDown(input);
        assert.deepEqual(result, expected);
    });



    it(`should transform an object position RIGHT by 2`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 2, y: 0};

        const result = Day9.moveRight(input, 2);
        assert.deepEqual(result, expected);
    });

    it(`should transform an object position LEFT by 2`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -2, y: 0};

        const result = Day9.moveLeft(input, 2);
        assert.deepEqual(result, expected);
    });

    it(`should transform an object position UP by 2`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 0, y: 2};

        const result = Day9.moveUp(input, 2);
        assert.deepEqual(result, expected);
    });

    it(`should transform an object position DOWN by 2`, async () => {
        const input: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 0, y: -2};

        const result = Day9.moveDown(input, 2);
        assert.deepEqual(result, expected);
    });


    it(`should get a horizontal move right towards target object`, async () => {
        const targetPos: Day9.Position = {x: 2, y: 0};
        const currentPos: Day9.Position = {x: 0, y: 0};

        const result: number = Day9.getHorizontalMove(currentPos, targetPos);
        assert.equal(result, 2);
    });

    it(`should get a horizontal move left towards target object`, async () => {
        const targetPos: Day9.Position = {x: 0, y: 0};
        const currentPos: Day9.Position = {x: 2, y: 0};

        const result: number = Day9.getHorizontalMove(currentPos, targetPos);
        assert.equal(result, -2);
    });



    it(`should get an offset vector between 2 objects`, async () => {
        const targetPos: Day9.Position = {x: 2, y: 1};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 2, y: 1};
        const result: Day9.Position = Day9.getOffset(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });


    it(`should get a horizontal move vector towards an object +ve horiz, +ve vert`, async () => {
        const targetPos: Day9.Position = {x: 2, y: 1};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    
    it(`should get a horizontal move vector towards an object -ve horiz, +ve vert`, async () => {
        const targetPos: Day9.Position = {x: -2, y: 1};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    it(`should get a horizontal move vector towards an object +ve horiz, -ve vert`, async () => {
        const targetPos: Day9.Position = {x: 2, y: -1};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: -1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    
    it(`should get a horizontal move vector towards an object -ve horiz, -ve vert`, async () => {
        const targetPos: Day9.Position = {x: -2, y: -1};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: -1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });




    it(`should get a vertical move vector towards an object +ve horiz, +ve vert`, async () => {
        const targetPos: Day9.Position = {x: 1, y: 2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    
    it(`should get a vertical move vector towards an object -ve horiz, +ve vert`, async () => {
        const targetPos: Day9.Position = {x: 1, y: -2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: -1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    it(`should get a vertical move vector towards an object +ve horiz, -ve vert`, async () => {
        const targetPos: Day9.Position = {x: -1, y: 2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    
    it(`should get a vertical move vector towards an object -ve horiz, -ve vert`, async () => {
        const targetPos: Day9.Position = {x: -1, y: -2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: -1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });




    it(`should get a diagonal move vector towards an object +ve horiz, +ve vert`, async () => {
        const targetPos: Day9.Position = {x: 2, y: 2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    
    it(`should get a diagonal move vector towards an object -ve horiz, +ve vert`, async () => {
        const targetPos: Day9.Position = {x: 2, y: -2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: -1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    it(`should get a diagonal move vector towards an object +ve horiz, -ve vert`, async () => {
        const targetPos: Day9.Position = {x: -2, y: 2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });

    
    it(`should get a diagonal move vector towards an object -ve horiz, -ve vert`, async () => {
        const targetPos: Day9.Position = {x: -2, y: -2};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: -1, y: -1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });


    it(`should get a diagonal move vector towards an object and onto the same row`, async () => {
        const targetPos: Day9.Position = {x: 2, y: 1};
        const currentPos: Day9.Position = {x: 0, y: 0};
        const expected: Day9.Position = {x: 1, y: 1};
        const result: Day9.Position = Day9.getMove(currentPos, targetPos);
        assert.deepEqual(result, expected);
    });



    it(`should get 2 moves from instruction 'U 2'`, async () => {
        const instruction:string = 'U 2';
        const expected: Day9.Position[] = [
            {x:0,y:1},
            {x:0,y:1},
        ];
        const instructions: Day9.Position[] = Day9.convertInstructionToMove(instruction);

        assert.deepEqual(instructions, expected);
    });

    it(`should get 2 moves from instruction 'D 2'`, async () => {
        const instruction:string = 'D 2';
        const expected: Day9.Position[] = [
            {x:0,y:-1},
            {x:0,y:-1},
        ];
        const instructions: Day9.Position[] = Day9.convertInstructionToMove(instruction);
        assert.deepEqual(instructions, expected);
    });

    it(`should get 2 moves from instruction 'R 2'`, async () => {
        const instruction:string = 'R 2';
        const expected: Day9.Position[] = [
            {x:1,y:0},
            {x:1,y:0},
        ];
        const instructions: Day9.Position[] = Day9.convertInstructionToMove(instruction);

        assert.deepEqual(instructions, expected);
    });

    it(`should get 2 moves from instruction 'L 2'`, async () => {
        const instruction:string = 'L 2';
        const expected: Day9.Position[] = [
            {x:-1,y:0},
            {x:-1,y:0},
        ];
        const instructions: Day9.Position[] = Day9.convertInstructionToMove(instruction);

        assert.deepEqual(instructions, expected);
    });

    it(`should adjust row due to diagonal distance`, async () => {
        const offset:Day9.Position = {x:2,y:1};
        const expected: Day9.Position = {x:1,y:1};
        const normalised:Day9.Position = Day9.getNormalisedOffset(offset);
        const result: Day9.Position = Day9.adjustForDiagonals(normalised,offset);
        assert.deepEqual(result, expected);
    });

    it(`should adjust row due to diagonal distance 2`, async () => {
        const offset:Day9.Position = {x:1,y:2};
        const expected: Day9.Position = {x:1,y:1};
        const normalised:Day9.Position = Day9.getNormalisedOffset(offset);
        const result: Day9.Position = Day9.adjustForDiagonals(normalised,offset);
        assert.deepEqual(result, expected);
    });

    it(`should adjust row due to diagonal distance 3`, async () => {
        const offset:Day9.Position = {x:1,y:-2};
        const expected: Day9.Position = {x:1,y:-1};
        const normalised:Day9.Position = Day9.getNormalisedOffset(offset);
        const result: Day9.Position = Day9.adjustForDiagonals(normalised,offset);
        assert.deepEqual(result, expected);
    });

    it(`should adjust row due to diagonal distance 4`, async () => {
        const offset:Day9.Position = {x:2,y:-2};
        const expected: Day9.Position = {x:1,y:-1};
        const normalised:Day9.Position = Day9.getNormalisedOffset(offset);
        const result: Day9.Position = Day9.adjustForDiagonals(normalised,offset);
        assert.deepEqual(result, expected);
    });

    it(`should get 1 follow move from 2 move instructions 'U 2', 'R 1'`, async () => {
        const instructions:string[] = ['U 2', 'R 1'];

        const expectedHeadPosition: Day9.Position = { x: 1, y: 2 };
        const expectedTailPosition: Day9.Position = { x: 0, y: 1 };

        let headPosition: Day9.Position = {x: 0, y: 0};
        let tailPosition: Day9.Position = {x: 0, y: 0};
        const tailHistory: Day9.Position[] = [ tailPosition ];
    
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];

            const actions: Day9.Position[] = Day9.convertInstructionToMove(instruction);

            for (let j = 0; j < actions.length; j++) {
                const action = actions[j];
                ({ headPosition, tailPosition } = Day9.executeInstruction(headPosition, action, tailPosition, tailHistory));                
            }
        }

        assert.deepEqual(headPosition, expectedHeadPosition);
        assert.deepEqual(tailPosition, expectedTailPosition);
        assert.equal(tailHistory.length, 2);
        
    });

    it(`should get 3 follow moves from 4 move instructions 'U 2', 'R 1', 'L 4'`, async () => {
        const instructions:string[] = ['U 2', 'R 1', 'L 4', 'D 4'];
        
        const expectedHeadPosition: Day9.Position = { x: -3, y: -2 };
        const expectedTailPosition: Day9.Position = { x: -3, y: -1 };

        let headPosition: Day9.Position = {x: 0, y: 0};
        let tailPosition: Day9.Position = {x: 0, y: 0};
        const tailHistory: Day9.Position[] = [ tailPosition ];
    
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            console.log(instruction);
            const actions: Day9.Position[] = Day9.convertInstructionToMove(instruction);

            for (let j = 0; j < actions.length; j++) {
                const action = actions[j];
                ({ headPosition, tailPosition } = Day9.executeInstruction(headPosition, action, tailPosition, tailHistory, true));                
            }
        }

        assert.deepEqual(headPosition, expectedHeadPosition);
        assert.deepEqual(tailPosition, expectedTailPosition);
        
    });

    it.skip(`should play out the example data for part 2 with diagnostics`, async () => {
        const rawData = [
            'R 4',
            'U 4',
            'L 3',
            'D 1',
            'R 4',
            'D 1',
            'L 5',
            'R 2'
        ];

        const result = Day9.part2(rawData, true);
        assert.exists(result);
    });
});