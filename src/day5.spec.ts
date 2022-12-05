import * as Day5 from './day5';
import { assert } from 'chai';

describe(`should convert layout string to data array`, async () => {


    it(`should return layout as array`, async () => {
        const layout: string = '[L] [F] [G]     [C]     [L] [N] [N]';
        const expected: string[] =  ['L', 'F', 'G', undefined, 'C', undefined, 'L', 'N', 'N'];
        const layoutArray: string[] = Day5.layoutLineToArray(layout);

        assert.deepEqual(layoutArray, expected);
    });

    it(`should get the number of stacks as 9 from the layout string`, async () => {
        const layout: string = '[L] [F] [G]     [C]     [L] [N] [N]';
        const expected = 9;

        const result: number = Day5.getStackCountFromLayoutString(layout);
        assert.equal(result, expected);
        
    });

    it(`should get the number of stacks as 9 from the layout string ending with spaces`, async () => {
        const layout: string = '[M] [H]         [N]                ';
        const expected = 9;

        const result: number = Day5.getStackCountFromLayoutString(layout);
        assert.equal(result, expected);
        
    });

    it(`should convert the move instructions string into data object`, async () => {
        const instruction: string = 'move 1 from 7 to 6';
        const expected = { move: 1, from: 7, to: 6 };

        const result = Day5.convertInstructionString(instruction);
        assert.deepEqual(result,  expected);
    });

    it(`should convert multiple layout strings into a container data structure`, async () => {
        const layout = [
            '[A]        ',
            '[B] [C] [D]',
            '[E] [F] [G]'
        ];
        const expected = [
            ['E', 'B', 'A'],
            ['F', 'C'],
            ['G', 'D']
        ];
        const expectedStackCount = 3;

        const containerArray = [];

        for (let i = 0; i < layout.length; i++) {
            const element = layout[i];
            const stackCount: number = Day5.getStackCountFromLayoutString(element);

            assert.equal(stackCount, expectedStackCount);

            const layoutArray: string[] = Day5.layoutLineToArray(element);

            containerArray.push(layoutArray);
        }

        const structure = Day5.createStructureFromContainerArray(containerArray);
        assert.deepEqual(structure, expected);
    });

    it(`should move the 'A' item from stack 1 to stack 3`, async () => {
        const structure = [
            ['E', 'B', 'A'],
            ['F', 'C'],
            ['G', 'D']
        ];         
        const expected = [
            ['E', 'B'],
            ['F', 'C'],
            ['G', 'D', 'A']
        ];         

        const instruction: Day5.Instruction = { move: 1, from: 1, to: 3 };

        const result = Day5.executeInstruction(structure, instruction);

        assert.deepEqual(result, expected);

    });

    it(`parse raw data`, async () => {
        const layout = [
            '[A]        ',
            '[B] [C] [D]',
            '[E] [F] [G]',
            ' 1   2   3 ',
            '',
            'move 1 from 1 to 3'
        ];

        const expected = {
            instructionsRaw:  [ 'move 1 from 1 to 3' ],
            structureRaw: [
                ['A', undefined, undefined],
                ['B', 'C', 'D'],
                ['E', 'F', 'G']
            ],
            instructions: [],
            structure: []
       } as Day5.CargoData
        
        const result = Day5.parseRawData(layout);
        assert.deepEqual(result, expected);

    });

    it(`parse raw data`, async () => {
        const layout = [
            '[A]        ',
            '[B] [C] [D]',
            '[E] [F] [G]',
            ' 1   2   3 ',
            '',
            'move 1 from 1 to 3'
        ];

        const expected = {
            instructionsRaw:  [ 'move 1 from 1 to 3' ],
            structureRaw: [
                ['A', undefined, undefined],
                ['B', 'C', 'D'],
                ['E', 'F', 'G']
            ],
            instructions: [],
            structure: []
        } as Day5.CargoData
        
        const result = Day5.parseRawData(layout);
        assert.deepEqual(result, expected);

    });

    it(`should move 1 item at a time for 2 moves in Single Move mode`, async () => {
        const structure = [
            ['A'],
            ['B', 'C', 'D']
        ];
        const instruction: Day5.Instruction = { move: 2, from: 2, to: 1 };
        const expected = [
            ['A', 'D', 'C'],
            ['B']
        ];

        const result = Day5.executeInstruction(structure, instruction, Day5.MoveMode.single);

        assert.deepEqual(result, expected);

    });
    it(`should move all items at once for 2 moves in Multiple Move mode`, async () => {
        const structure = [
            ['A'],
            ['B', 'C', 'D']
        ];
        const instruction: Day5.Instruction = { move: 2, from: 2, to: 1 };
        const expected = [
            ['A', 'C', 'D'],
            ['B']
        ];

        const result = Day5.executeInstruction(structure, instruction, Day5.MoveMode.multiple);

        assert.deepEqual(result, expected);

    });
});